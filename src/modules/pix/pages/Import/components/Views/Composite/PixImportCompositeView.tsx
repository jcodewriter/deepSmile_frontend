import React from "react";
import { Flex, VStack } from "@chakra-ui/core";
import PixImportPhotosCompositeRightView from "./PixImportPhotosCompositeRightView";
import PixImportPhotosCompositeLeftView from "./PixImportPhotosCompositeLeftView";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useUpdateEffect from "../../../shared/hooks/useUpdateEffect";
import { drawTemplate } from "../../../shared/utils/job";
import {
  usePixPhotoProcessorDispatch,
  usePixPhotoProcessorState,
} from "src/modules/pix/pages/Import/shared/contexts/PixImportContext";
import {
  PixPhotoProcessorActionType,
  TEMPLATE_STATUTES,
} from "../../../shared/types/PhotoProcessorContext";
import { useMutation } from "@apollo/client";
import { ADD_TEMPLATE_IMAGE } from "src/graphql/Mutations/Images";
import { AddTemplateImagePayload } from "types/Mutations/Job";
import CommonHelper from "src/utils/helpers/CommonHelper";
import PixSharedFooterView from "src/modules/pix/shared/components/Views/PixSharedFooterView";

interface CustomBlob extends Blob {
  name?: string;
}

const PixImportCompositeView = () => {
  const { jobState, compositeState } = usePixPhotoProcessorState();
  const dispatch = usePixPhotoProcessorDispatch();

  const [addTemplateImage] = useMutation<AddTemplateImagePayload>(ADD_TEMPLATE_IMAGE);

  function createTemplateBlob() {
    const canvas = document.createElement("canvas");

    const images = compositeState.imageList.filter((image) => image.status === "SELECTED");

    return drawTemplate(canvas, images, compositeState.logo).then(() =>
      CommonHelper.convertCanvasToBlob(canvas)
    );
  }

  useUpdateEffect(() => {
    if (!compositeState.isInitialized || compositeState.readOnly) return;

    let isCanceled = false;

    dispatch({
      type: PixPhotoProcessorActionType.SET_TEMPLATE_STATUS,
      status: TEMPLATE_STATUTES.UPLOADING,
    });

    createTemplateBlob()
      .then((blob) => {
        if (isCanceled) return;

        const templateBlob: CustomBlob = new Blob([blob as Blob], { type: "image/jpeg" });
        templateBlob.name = "template.jpg";
        return addTemplateImage({
          variables: {
            templateImage: templateBlob,
            idJob: jobState.job?.id,
          },
        })
          .then((res) => {
            if (isCanceled) return;

            dispatch({
              type: PixPhotoProcessorActionType.SET_TEMPLATE_STATUS,
              status: TEMPLATE_STATUTES.SUCCESS,
            });
            dispatch({
              type: PixPhotoProcessorActionType.UPDATE_TEMPLATE_ZIP_URL,
              url: res.data?.addTemplateImage.urlZip,
            });
          })
          .catch((error) => {
            if (isCanceled) return;

            console.error(error);
            dispatch({
              type: PixPhotoProcessorActionType.SET_TEMPLATE_STATUS,
              status: TEMPLATE_STATUTES.FAILURE,
            });
          });
      })
      .catch((error: Error) => {
        if (isCanceled) return;

        console.error(error);
        dispatch({
          type: PixPhotoProcessorActionType.SET_TEMPLATE_STATUS,
          status: TEMPLATE_STATUTES.FAILURE,
        });
      });
    return () => {
      isCanceled = true;
    };
  }, [compositeState.imageList, compositeState.isInitialized, compositeState.logo]);

  const downloadTemplate = () => {
    createTemplateBlob().then((blob) => {
      // IE 11
      if (navigator.msSaveBlob) {
        return navigator.msSaveBlob(blob, "template.jpg");
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "template.jpg");
        document.body.appendChild(link);
        link.click();
        setTimeout(() => URL.revokeObjectURL(url));
      }
    });
  };

  return (
    <VStack spacing="0px">
      <Flex minH="770px" minW="100%">
        <DndProvider backend={HTML5Backend}>
          <PixImportPhotosCompositeLeftView />
          <PixImportPhotosCompositeRightView />
        </DndProvider>
      </Flex>
      <PixSharedFooterView isComposite={true} downloadTemplate={downloadTemplate} />
    </VStack>
  );
};

export default PixImportCompositeView;
