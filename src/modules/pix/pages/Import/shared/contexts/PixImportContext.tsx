import React, { createContext, Dispatch, useCallback, useReducer } from "react";
import useSafeContext from "src/shared/hooks/useSafeContext";
import {
  PhotoProcessorStep,
  _PixPhotoProcessorAction,
  PixPhotoProcessorActionType,
  PixPhotoProcessorStateProps,
  TemplateImage,
  JOB_STATUTES,
  TEMPLATE_STATUTES,
} from "src/modules/pix/pages/Import/shared/types/PhotoProcessorContext";
import { ProcessImagesPayload } from "types/Mutations/Job";
import { useToast } from "@chakra-ui/core";
import { Job } from "types/Job";
import { addImageParams, convertImage, selectUniqueImages } from "../utils/composite";

const PixPhotoProcessorStateContext = createContext<PixPhotoProcessorStateProps | undefined>(
  undefined
);
const PixPhotoProcessorDispatchContext = createContext<
  Dispatch<_PixPhotoProcessorAction> | undefined
>(undefined);

const defaultJobState = {
  jobProgress: 0,
  jobStatus: JOB_STATUTES.IDLE,
  templateStatus: TEMPLATE_STATUTES.IDLE,
  downloadCounter: 0,
};

const defaultPhotoProcessorState: PixPhotoProcessorStateProps = {
  step: PhotoProcessorStep.WAITING_FOR_FILES,
  editorState: {
    isOn: false,
  },
  compositeState: {
    imageList: [],
    readOnly: false,
    isInitialized: false,
    logo: "",
  },
  jobState: defaultJobState,
};

const importReducer = (state: PixPhotoProcessorStateProps, action: _PixPhotoProcessorAction) => {
  switch (action.type) {
    case PixPhotoProcessorActionType.SET_EDITOR_STATE: {
      return {
        ...state,
        editorState: {
          ...state.editorState,
          isOn: action.state,
        },
      };
    }
    case PixPhotoProcessorActionType.SET_STEP: {
      return {
        ...state,
        step: action.step,
      };
    }
    case PixPhotoProcessorActionType.SET_PE_PROCESSING: {
      return {
        ...state,
        step: PhotoProcessorStep.PROCESSING,
        jobState: {
          ...state.jobState,
          jobId: action.jobId,
        },
      };
    }
    case PixPhotoProcessorActionType.SET_PE_GALLERY: {
      return {
        ...state,
        step: PhotoProcessorStep.GALLERY,
        jobState: {
          ...state.jobState,
          job: action.processedJob,
        },
      };
    }
    case PixPhotoProcessorActionType.SET_PE_COMPOSITE: {
      return {
        ...state,
        step: PhotoProcessorStep.COMPOSITE,
      };
    }
    case PixPhotoProcessorActionType.RESET_PHOTO_PROCESSOR: {
      return defaultPhotoProcessorState;
    }
    case PixPhotoProcessorActionType.SET_COMPOSITE_INITIALIZED: {
      return {
        ...state,
        compositeState: {
          ...state.compositeState,
          isInitialized: action.isInitialized,
        },
      };
    }
    case PixPhotoProcessorActionType.SET_COMPOSITE_IMAGE_LIST: {
      return {
        ...state,
        compositeState: {
          ...state.compositeState,
          imageList: action.imageList,
        },
      };
    }
    case PixPhotoProcessorActionType.SET_COMPOSITE_LOADING: {
      return {
        ...state,
        compositeState: {
          ...state.compositeState,
          isLoading: action.isLoading,
        },
      };
    }
    case PixPhotoProcessorActionType.SELECT_COMPOSITE_IMAGE: {
      if (state.compositeState.readOnly) return state;

      return {
        ...state,
        compositeState: {
          ...state.compositeState,
          imageList: state.compositeState.imageList.map((image) => {
            if (image.id === action.payload.imageId) {
              return { ...image, status: "SELECTED", position: action.payload.position };
            }

            return image;
          }),
        },
      };
    }
    case PixPhotoProcessorActionType.UNSELECT_COMPOSITE_IMAGE: {
      if (state.compositeState.readOnly) return state;

      const imageIndex = state.compositeState.imageList.findIndex(
        (image) => image.id === action.imageId
      );

      const updatedImage = {
        ...state.compositeState.imageList[imageIndex],
        status: "UNSELECTED",
        position: { row: -1, column: -1 },
      };

      return {
        ...state,
        compositeState: {
          ...state.compositeState,
          imageList: [
            updatedImage,
            ...state.compositeState.imageList.slice(0, imageIndex),
            ...state.compositeState.imageList.slice(imageIndex + 1),
          ],
        },
      };
    }
    case PixPhotoProcessorActionType.SET_COMPOSITE_LOGO_SOURCE: {
      return {
        ...state,
        compositeState: {
          ...state.compositeState,
          logo: action.logoSrc,
        },
      };
    }
    case PixPhotoProcessorActionType.REPLACE_COMPOSITE_IMAGE: {
      if (state.compositeState.readOnly) return state;

      const oldImage = state.compositeState.imageList.find(
        (image) => image.id === action.payload.oldImageId
      );
      const newImage = state.compositeState.imageList.find(
        (image) => image.id === action.payload.newImageId
      );
      return {
        ...state,
        compositeState: {
          ...state.compositeState,
          imageList: state.compositeState.imageList.map((image) => {
            if (image.id === oldImage?.id) {
              return {
                ...image,
                status: newImage?.status,
                position: newImage?.position ?? { row: -1, column: -1 },
              };
            }

            if (image.id === newImage?.id) {
              return {
                ...image,
                status: oldImage?.status,
                position: oldImage?.position ?? { row: -1, column: -1 },
              };
            }

            return image;
          }),
        },
      };
    }
    case PixPhotoProcessorActionType.START_EDIT_IMAGE: {
      if (state.compositeState.readOnly) return state;

      return {
        ...state,
        editorState: {
          isOn: true,
        },
        compositeState: {
          ...state.compositeState,
          editingImage: state.compositeState.imageList.find((image) => image.id === action.imageId),
        },
      };
    }
    case PixPhotoProcessorActionType.FINISH_EDIT_IMAGE: {
      if (state.compositeState.readOnly) return state;

      return {
        ...state,
        editorState: {
          isOn: false,
        },
        compositeState: {
          ...state.compositeState,
          editingImage: undefined,
          imageList: state.compositeState.imageList.map((image) => {
            if (image.id === action.payload.imageId) {
              return {
                ...image,
                src: action.payload.src,
                editParams: action.payload.params,
                editorSrc: action.payload.editorSrc,
              };
            }

            return image;
          }),
        },
      };
    }
    case PixPhotoProcessorActionType.CANCEL_EDIT_IMAGE: {
      if (state.compositeState.readOnly) return state;

      return {
        ...state,
        editorState: {
          isOn: false,
        },
        compositeState: {
          ...state.compositeState,
          editingImage: undefined,
        },
      };
    }
    case PixPhotoProcessorActionType.SET_JOB_STATUT: {
      return {
        ...state,
        jobState: {
          ...state.jobState,
          jobStatus: action.payload.status,
          error:
            action.payload.status === JOB_STATUTES.FAILURE
              ? {
                  jobId: action.payload.jobId,
                }
              : undefined,
        },
      };
    }
    case PixPhotoProcessorActionType.SET_JOB_PROGRESS: {
      return {
        ...state,
        jobState: {
          ...state.jobState,
          jobProgress: action.progress,
        },
      };
    }
    case PixPhotoProcessorActionType.SET_TEMPLATE_STATUS: {
      return {
        ...state,
        jobState: {
          ...state.jobState,
          templateStatus: action.status,
        },
      };
    }
    case PixPhotoProcessorActionType.TRIGGER_DOWNLOAD: {
      return {
        ...state,
        jobState: {
          ...state.jobState,
          downloadCounter: state.jobState.downloadCounter + 1,
        },
      };
    }
    case PixPhotoProcessorActionType.RESET_DOWNLOAD_COUNTER: {
      return {
        ...state,
        jobState: {
          ...state.jobState,
          downloadCounter: defaultJobState.downloadCounter,
        },
      };
    }

    case PixPhotoProcessorActionType.UPDATE_PROCESSED_IMAGE_URL: {
      if (!state.jobState.job) return state;
      return {
        ...state,
        jobState: {
          ...state.jobState,
          job: {
            ...state.jobState.job,
            processedImages: state.jobState.job.processedImages.map((image) => {
              if (image.id === action.payload.imageId) {
                return { ...image, editedUrl: action.payload.editedUrl };
              }

              return image;
            }),
          },
        },
      };
    }
    case PixPhotoProcessorActionType.UPDATE_TEMPLATE_ZIP_URL: {
      if (!state.jobState.job) return state;
      return {
        ...state,
        jobState: {
          ...state.jobState,
          job: {
            ...state.jobState.job,
            urlZip: action.url,
          },
        },
      };
    }
    case PixPhotoProcessorActionType.SET_COMPOSITE_READ_ONLY: {
      if (!state.jobState.job) return state;
      return {
        ...state,
        compositeState: {
          ...state.compositeState,
          readOnly: action.readOnly,
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type '${JSON.stringify(action)}'`);
    }
  }
};

const PixPhotoProcessorProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<
    React.Reducer<PixPhotoProcessorStateProps, _PixPhotoProcessorAction>
  >(importReducer, defaultPhotoProcessorState);

  return (
    <PixPhotoProcessorStateContext.Provider value={state}>
      <PixPhotoProcessorDispatchContext.Provider value={dispatch}>
        {children}
      </PixPhotoProcessorDispatchContext.Provider>
    </PixPhotoProcessorStateContext.Provider>
  );
};

const usePixPhotoProcessorState = () =>
  useSafeContext(PixPhotoProcessorStateContext, "PixPhotoProcessorState");
const usePixPhotoProcessorDispatch = () =>
  useSafeContext(PixPhotoProcessorDispatchContext, "PixPhotoProcessorDispatch");

const usePixPhotoProcessorFunctions = () => {
  const dispatch = usePixPhotoProcessorDispatch();

  const goToPreviousStep = useCallback((step: PhotoProcessorStep) => {
    dispatch({
      type: PixPhotoProcessorActionType.SET_STEP,
      step,
    });
  }, []);

  const goToProcessImages = useCallback((payload: ProcessImagesPayload) => {
    dispatch({
      type: PixPhotoProcessorActionType.SET_PE_PROCESSING,
      jobId: payload.processImages.id,
    });
  }, []);

  const goToGallery = useCallback((processedJob: Job) => {
    dispatch({
      type: PixPhotoProcessorActionType.SET_PE_GALLERY,
      processedJob,
    });
  }, []);

  const goToComposite = useCallback(() => {
    dispatch({
      type: PixPhotoProcessorActionType.SET_PE_COMPOSITE,
    });
  }, []);

  const setCompositeData = useCallback((rawImages: TemplateImage[] | undefined) => {
    if (typeof rawImages === "undefined") return [];
    dispatch({ type: PixPhotoProcessorActionType.SET_COMPOSITE_LOADING, isLoading: true });

    Promise.all(rawImages.map(convertImage).map(addImageParams))
      .then(selectUniqueImages)
      .then((imageList) => {
        dispatch({ type: PixPhotoProcessorActionType.SET_COMPOSITE_IMAGE_LIST, imageList });
        dispatch({
          type: PixPhotoProcessorActionType.SET_COMPOSITE_INITIALIZED,
          isInitialized: true,
        });
        dispatch({ type: PixPhotoProcessorActionType.SET_COMPOSITE_LOADING, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: PixPhotoProcessorActionType.SET_COMPOSITE_LOADING, isLoading: false });
      });
  }, []);

  const unselectCompositeImage = useCallback((imageId: string) => {
    dispatch({
      type: PixPhotoProcessorActionType.UNSELECT_COMPOSITE_IMAGE,
      imageId,
    });
  }, []);

  /**
   * Extremely basic way to handle Errors
   */
  const handleError = useCallback((step: PhotoProcessorStep, description: string) => {
    const toast = useToast();

    toast({
      position: "top",
      title: `Error in ${step} step`,
      description,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    dispatch({
      type: PixPhotoProcessorActionType.RESET_PHOTO_PROCESSOR,
    });
  }, []);

  return {
    goToPreviousStep,
    goToProcessImages,
    goToGallery,
    handleError,
    goToComposite,
    setCompositeData,
    unselectCompositeImage,
  };
};
const usePixPhotoProcessor = () => [usePixPhotoProcessorState(), usePixPhotoProcessorDispatch()];

export {
  PixPhotoProcessorProvider,
  usePixPhotoProcessor,
  usePixPhotoProcessorState,
  usePixPhotoProcessorDispatch,
  usePixPhotoProcessorFunctions,
};
