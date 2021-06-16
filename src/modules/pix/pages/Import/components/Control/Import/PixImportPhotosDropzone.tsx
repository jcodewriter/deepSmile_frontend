import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Spinner, Stack, HStack, Text, Image } from "@chakra-ui/core";
import { useMutation } from "@apollo/client";
import { PROCESS_IMAGES } from "src/graphql/Mutations/Images";
import { ProcessImagesPayload } from "types/Mutations/Job";
import { usePixPhotoProcessorFunctions } from "src/modules/pix/pages/Import/shared/contexts/PixImportContext";
import useTranslation from "next-translate/useTranslation";

const PixImportPhotosDropzone = () => {
  const { t } = useTranslation();

  const { goToProcessImages } = usePixPhotoProcessorFunctions();
  const [processImages, { loading }] = useMutation<ProcessImagesPayload>(PROCESS_IMAGES);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    const res = await processImages({
      variables: { externalIdPatient: "test", images: acceptedFiles },
    });
    if (res.data) {
      goToProcessImages(res.data);
    } else if (res.errors) {
      console.log(res.errors[0].message);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: "image/jpeg,image/jpg,image/png",
  });

  if (loading) {
    return (
      <HStack
        width="700px"
        height="194px"
        background="brandBlue.100"
        color="white"
        borderRadius="8px"
        justify="center"
        align="center"
        spacing="10px"
        textAlign="center"
        fontSize="16px"
        lineHeight="24px"
      >
        <Text>{t("pixImport:processingStepText")}</Text>
        <Spinner colorScheme="white" />
      </HStack>
    );
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Stack
        cursor="pointer"
        width="700px"
        height="194px"
        background="brandBlue.100"
        color="white"
        borderRadius="8px"
        justify="center"
        align="center"
        spacing="10px"
        textAlign="center"
        fontSize="16px"
        lineHeight="24px"
      >
        <Image src="/svg/uploadIcon.svg" />
        <Text fontWeight="bold">{t("pixImport:uploadStepDrop")}</Text>
        <Text as="u" fontWeight="500">
          {t("pixImport:uploadStepLink")}
        </Text>
      </Stack>
    </div>
  );
};

export default PixImportPhotosDropzone;
