import React, { useCallback, useEffect } from "react";
import PixImportPhotosCompositeImageBlock from "src/modules/pix/pages/Import/components/Blocks/Composite/PixImportPhotosCompositeImageBlock";
import { Stack, Text, Link, Image } from "@chakra-ui/core";
import { useDropzone } from "react-dropzone";
import { useAuth } from "src/shared/contexts/AuthContext";
import { PixPhotoProcessorActionType } from "../../../shared/types/PhotoProcessorContext";
import CommonHelper from "src/utils/helpers/CommonHelper";
import {
  usePixPhotoProcessorDispatch,
  usePixPhotoProcessorState,
} from "../../../shared/contexts/PixImportContext";
import useTranslation from "next-translate/useTranslation";

const PixImportPhotosCompositeLogoBlock = () => {
  const { t } = useTranslation();
  const [{ profile }, { updateUserLogo }] = useAuth();
  const { compositeState } = usePixPhotoProcessorState();
  const dispatch = usePixPhotoProcessorDispatch();

  useEffect(() => {
    if (profile?.logo) {
      dispatch({
        type: PixPhotoProcessorActionType.SET_COMPOSITE_LOGO_SOURCE,
        logoSrc: CommonHelper.convertS3Url(profile?.logo),
      });
    }
  }, [profile?.logo]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length !== 1) {
      console.log("issue with logo file");
    } else {
      updateUserLogo(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: "image/jpeg,image/jpg,image/png",
    multiple: false,
  });

  if (compositeState?.logo) {
    return (
      <PixImportPhotosCompositeImageBlock>
        <Image boxSize="100%" objectFit="cover" src={compositeState?.logo} />
      </PixImportPhotosCompositeImageBlock>
    );
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <PixImportPhotosCompositeImageBlock>
        <Stack h="100%" justify="center" align="center">
          <Text fontWeight="500" fontSize="16px" lineHeight="24px">
            {t("pixImport:logo")}
          </Text>
          <Link fontSize="16px" lineHeight="24px" textDecor="underline">
            {t("pixImport:logoLink")}
          </Link>
        </Stack>
      </PixImportPhotosCompositeImageBlock>
    </div>
  );
};

export default PixImportPhotosCompositeLogoBlock;
