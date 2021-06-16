import { gql } from "@apollo/client";
import { JOB_FRAGMENT } from "src/graphql/fragments";

/**
 * We only need the job id to start the subscription
 */
const PROCESS_IMAGES = gql`
  mutation processImages($externalIdPatient: String!, $images: [Upload!]!) {
    processImages(externalIdPatient: $externalIdPatient, images: $images) {
      id
    }
  }
`;

const ADD_TEMPLATE_IMAGE = gql`
  mutation addTemplateImage($templateImage: Upload!, $idJob: String!) {
    addTemplateImage(templateImage: $templateImage, idJob: $idJob) ${JOB_FRAGMENT}
  }
`;

const UPDATE_IMAGE = gql`
  mutation updateImage($newImage: Upload!, $idImage: String!) {
    updateImage(newImage: $newImage, idImage: $idImage) {
      id
      idJob
      idOriginalImage
      filename
      url
      type
      createdAt
      updatedAt
    }
  }
`;

export { UPDATE_IMAGE, PROCESS_IMAGES, ADD_TEMPLATE_IMAGE };
