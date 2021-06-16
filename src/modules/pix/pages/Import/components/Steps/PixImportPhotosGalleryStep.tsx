import React, { useMemo, useEffect, useState } from "react";
import { Stack, Text, Image as ChakraImage, Box, Heading, Grid, Flex } from "@chakra-ui/core";

import PixSharedFooterView from "src/modules/pix/shared/components/Views/PixSharedFooterView";
import {
  usePixPhotoProcessorFunctions,
  usePixPhotoProcessorState,
  usePixPhotoProcessorDispatch,
} from "src/modules/pix/pages/Import/shared/contexts/PixImportContext";
import useTranslation from "next-translate/useTranslation";
import CommonHelper from "src/utils/helpers/CommonHelper";
import { Image } from "src/shared/types/Job";
import { PixPhotoProcessorActionType } from "src/modules/pix/pages/Import/shared/types/PhotoProcessorContext";
import { useAuthDispatch } from "src/shared/contexts/AuthContext";

const Images = ({ processedImage }: { processedImage: Image }) => {
  const { jobState } = usePixPhotoProcessorState();
  const dispatch = usePixPhotoProcessorDispatch();
  const [isHover, setHover] = useState(false);
  const { refreshNumberOfPhotos } = useAuthDispatch();

  useEffect(() => {
    refreshNumberOfPhotos();
  }, []);

  const originalImage = useMemo(() => {
    return jobState?.job?.inputImages?.filter(
      (image) => image.id === processedImage.idOriginalImage
    )[0];
  }, [processedImage.idOriginalImage]);

  return (
    <React.Fragment key={processedImage.id}>
      <ChakraImage objectFit="cover" src={originalImage?.url} />
      <Box
        cursor="url(/svg/importCursorPointer.svg), auto"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        h="auto"
        w="auto"
        _hover={{
          backgroundColor: "brandBlue.100",
          backgroundImage: "url(/svg/galleryPen.svg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => {
          dispatch({
            type: PixPhotoProcessorActionType.START_EDIT_IMAGE,
            imageId: processedImage.id,
          });
        }}
      >
        {isHover ? (
          <Box />
        ) : (
          <ChakraImage
            key={processedImage.id}
            objectFit="cover"
            src={processedImage.url ? processedImage.url : originalImage?.url}
          />
        )}
      </Box>
    </React.Fragment>
  );
};

const PixImportPhotosGalleryStep = () => {
  const { t } = useTranslation();
  const { jobState } = usePixPhotoProcessorState();
  const { setCompositeData } = usePixPhotoProcessorFunctions();

  const templateImageList = useMemo(() => {
    const inputImageMap = new Map(
      jobState.job?.inputImages?.map((image) => [
        image.id,
        { url: image.url, name: image.filename },
      ])
    );

    return jobState.job?.processedImages.map((processedImage) => {
      const originalUrl = CommonHelper.convertS3Url(
        inputImageMap.get(processedImage.idOriginalImage)?.url ?? ""
      );
      const url = processedImage.url ? CommonHelper.convertS3Url(processedImage.url) : originalUrl;

      return {
        id: processedImage.id,
        type: processedImage.type,
        filename: inputImageMap.get(processedImage.idOriginalImage)?.name ?? "",
        url,
        originalUrl,
      };
    });
  }, [jobState.job?.inputImages, jobState.job?.processedImages]);

  useEffect(() => {
    if (templateImageList?.length) {
      setCompositeData(templateImageList);
    }
  }, [templateImageList?.length]);

  return (
    <Flex direction="column">
      <Stack
        flex="1 0 auto"
        padding="32px 200px"
        mb="116px"
        align="center"
        spacing="25px"
        minH="calc(100vh - 80px - 68px - 116px)"
      >
        <Heading fontWeight="bold" fontSize="24px" lineHeight="36px" textAlign="center">
          {t("pixImport:galleryTitle")}
        </Heading>
        <Grid
          gridColumnGap="50px"
          gridRowGap="30px"
          gridTemplateColumns="repeat(2, 1fr)"
          width="770px"
        >
          <Text fontWeight="bold" fontSize="14px" lineHeight="36px">
            {t("pixImport:before")}
          </Text>
          <Text fontWeight="bold" fontSize="14px" lineHeight="36px">
            {t("pixImport:after")}
          </Text>{" "}
          {jobState?.job?.processedImages?.map((processedImage) => (
            <Images key={processedImage.id} processedImage={processedImage} />
          ))}
        </Grid>
      </Stack>
      <Box position="fixed" w="100%" left="0" bottom="0">
        <PixSharedFooterView />
      </Box>
    </Flex>
  );
};

export default PixImportPhotosGalleryStep;
