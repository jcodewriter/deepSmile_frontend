import React, { createContext, Dispatch, useCallback, useReducer } from "react";
import useSafeContext from "src/shared/hooks/useSafeContext";

import {
  FunnelVariables,
  FaceZoomStepPayload,
  FaceBGColorStepPayload,
  OcclusalCutStepPayload,
  IntraOralZoomStepPayload,
  MirrorStepPayload,
} from "src/modules/pix/shared/types/funnel";
import { FaceZoomLevel, OcclusalCut, IntraOralZoomLevel } from "src/shared/types/User";

interface UserCustomizationParameters {
  faceZoomLevel: FaceZoomLevel;
  faceBackgroundColor: string;
  occlusalCut: OcclusalCut;
  intraOralZoomLevel: IntraOralZoomLevel;
  useMirror: boolean;
  useMirrorOcclusal: boolean;
  autoSoftwareFlip: boolean;
}

interface PixFunnelStateProps {
  funnelVariables: UserCustomizationParameters;
  stepCompleted: {
    faceZoomLevel: boolean;
    faceBackgroundColor: boolean;
    occlusalCut: boolean;
    intraOralZoomLevel: boolean;
    mirror: boolean;
  };
}

interface PixFunnelActionPayload extends Partial<FunnelVariables> {
  faceZoomLevelStep?: FaceZoomStepPayload;
  faceBackgroundColorStep?: FaceBGColorStepPayload;
  occlusalCutStep?: OcclusalCutStepPayload;
  intraoralZoomLevelStep?: IntraOralZoomStepPayload;
  mirrorStep?: MirrorStepPayload;
}

enum PixFunnelActionType {
  HANDLE_FACE_ZOOM_LEVEL_STEP,
  HANDLE_FACE_BG_COLOR_STEP,
  HANDLE_OCCLUSAL_CUT_STEP,
  HANDLE_INTRA_ORAL_ZOOM_LEVEL_STEP,
  HANDLE_MIRROR_STEP,
}

interface PixFunnelAction {
  type: PixFunnelActionType;
  payload?: PixFunnelActionPayload;
}

const PixFunnelStateContext = createContext<PixFunnelStateProps | undefined>(undefined);
const PixFunnelDispatchContext = createContext<Dispatch<PixFunnelAction> | undefined>(undefined);

const defaultFunnelState: PixFunnelStateProps = {
  funnelVariables: {
    faceZoomLevel: FaceZoomLevel.LOW,
    faceBackgroundColor: "#FFFFFF",
    occlusalCut: OcclusalCut.SIX,
    intraOralZoomLevel: IntraOralZoomLevel.LEVEL_85P,
    useMirror: false,
    useMirrorOcclusal: true,
    autoSoftwareFlip: false,
  },
  stepCompleted: {
    faceZoomLevel: false,
    faceBackgroundColor: false,
    occlusalCut: false,
    intraOralZoomLevel: false,
    mirror: false,
  },
};

const funnelReducer = (state: PixFunnelStateProps, action: PixFunnelAction) => {
  switch (action.type) {
    case PixFunnelActionType.HANDLE_FACE_ZOOM_LEVEL_STEP:
      return {
        stepCompleted: {
          ...state.stepCompleted,
          faceZoomLevel: true,
        },
        funnelVariables: {
          ...state.funnelVariables,
          faceZoomLevel:
            action.payload?.faceZoomLevelStep?.faceZoomLevel ?? state.funnelVariables.faceZoomLevel,
        },
      };
    case PixFunnelActionType.HANDLE_FACE_BG_COLOR_STEP:
      return {
        stepCompleted: {
          ...state.stepCompleted,
          faceBackgroundColor: true,
        },
        funnelVariables: {
          ...state.funnelVariables,
          faceBackgroundColor:
            action.payload?.faceBackgroundColorStep?.faceBackgroundColor ??
            state.funnelVariables.faceBackgroundColor,
        },
      };
    case PixFunnelActionType.HANDLE_OCCLUSAL_CUT_STEP:
      return {
        stepCompleted: {
          ...state.stepCompleted,
          occlusalCut: true,
        },
        funnelVariables: {
          ...state.funnelVariables,
          occlusalCut:
            action.payload?.occlusalCutStep?.occlusalCut ?? state.funnelVariables.occlusalCut,
        },
      };
    case PixFunnelActionType.HANDLE_INTRA_ORAL_ZOOM_LEVEL_STEP:
      return {
        stepCompleted: {
          ...state.stepCompleted,
          intraOralZoomLevel: true,
        },
        funnelVariables: {
          ...state.funnelVariables,
          intraOralZoomLevel:
            action.payload?.intraoralZoomLevelStep?.intraOralZoomLevel ??
            state.funnelVariables.intraOralZoomLevel,
        },
      };

    case PixFunnelActionType.HANDLE_MIRROR_STEP:
      return {
        stepCompleted: {
          ...state.stepCompleted,
          mirror: true,
        },
        funnelVariables: {
          ...state.funnelVariables,
          useMirror: action.payload?.mirrorStep?.useMirror ?? state.funnelVariables.useMirror,
          useMirrorOcclusal:
            action.payload?.mirrorStep?.useMirrorOcclusal ??
            state.funnelVariables.useMirrorOcclusal,
          autoSoftwareFlip:
            action.payload?.mirrorStep?.autoSoftwareFlip ?? state.funnelVariables.autoSoftwareFlip,
        },
      };

    default: {
      throw new Error(`Unhandled action type '${action.type}'`);
    }
  }
};

const PixFunnelProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<PixFunnelStateProps, PixFunnelAction>>(
    funnelReducer,
    defaultFunnelState
  );

  return (
    <PixFunnelStateContext.Provider value={state}>
      <PixFunnelDispatchContext.Provider value={dispatch}>
        {children}
      </PixFunnelDispatchContext.Provider>
    </PixFunnelStateContext.Provider>
  );
};

const usePixFunnelState = () => useSafeContext(PixFunnelStateContext, "PixFunnelState");
const usePixFunnelDispatch = () => useSafeContext(PixFunnelDispatchContext, "PixFunnelDispatch");

const usePixFunnelFunctions = () => {
  const dispatch = usePixFunnelDispatch();

  const handleFaceZoomLevelStep = useCallback(
    (payload: FaceZoomStepPayload) =>
      dispatch({
        type: PixFunnelActionType.HANDLE_FACE_ZOOM_LEVEL_STEP,
        payload: {
          faceZoomLevelStep: payload,
        },
      }),
    []
  );

  const handleFaceBackgroundColorStep = useCallback(
    (payload: FaceBGColorStepPayload) =>
      dispatch({
        type: PixFunnelActionType.HANDLE_FACE_BG_COLOR_STEP,
        payload: {
          faceBackgroundColorStep: payload,
        },
      }),
    []
  );
  const handleOcclusalCutStep = useCallback(
    (payload: OcclusalCutStepPayload) =>
      dispatch({
        type: PixFunnelActionType.HANDLE_OCCLUSAL_CUT_STEP,
        payload: {
          occlusalCutStep: payload,
        },
      }),
    []
  );

  const handleIntraoralZoomLevelStep = useCallback(
    (payload: IntraOralZoomStepPayload) =>
      dispatch({
        type: PixFunnelActionType.HANDLE_INTRA_ORAL_ZOOM_LEVEL_STEP,
        payload: {
          intraoralZoomLevelStep: payload,
        },
      }),
    []
  );

  const handleUseMirrorStep = useCallback(
    (payload: MirrorStepPayload) =>
      dispatch({
        type: PixFunnelActionType.HANDLE_MIRROR_STEP,
        payload: {
          mirrorStep: payload,
        },
      }),
    []
  );

  return {
    handleFaceZoomLevelStep,
    handleFaceBackgroundColorStep,
    handleOcclusalCutStep,
    handleIntraoralZoomLevelStep,
    handleUseMirrorStep,
  };
};

const usePixFunnel = () => [usePixFunnelState(), usePixFunnelDispatch()];

export {
  PixFunnelProvider,
  usePixFunnel,
  usePixFunnelState,
  usePixFunnelDispatch,
  usePixFunnelFunctions,
};
