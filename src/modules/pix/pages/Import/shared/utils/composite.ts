import {
  CompositeImage,
  TemplateImage,
} from "src/modules/pix/pages/Import/shared/types/PhotoProcessorContext";

function getImageFromSource(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "anonymous";
    img.src = source;
  });
}

export function addImageParams(imageObject: CompositeImage) {
  return getImageFromSource(imageObject.src).then((image) => {
    const { naturalHeight, naturalWidth } = image;

    return {
      ...imageObject,
      naturalWidth: image?.naturalWidth,
      naturalHeight,
      aspectRatio: naturalHeight / naturalWidth,
    };
  });
}

export function convertImage(image: TemplateImage): CompositeImage {
  return {
    id: image.id, //unique id
    type: image.type, // enum <IMAGE_TYPE>
    filename: image.filename,
    status: "UNSELECTED", // SELECTED | UNSELECTED
    src: image.url, // src of image, which will be used in final template
    editorSrc: image.url, // src of image, which will be used during editor initialization
    processedSrc: image.url, // src of processed image
    originalSrc: image.originalUrl, // src of uploaded image
    editParams: undefined,
    position: {},
    aspectRatio: undefined,
    naturalWidth: 0,
    naturalHeight: 0,
  };
}

const positionMap: { [x: string]: number } = {
  TOP: 1,
  MIDDLE: 2,
  BOTTOM: 3,
  LEFT: 1,
  RIGHT: 3,
};

const INVERSE_IMAGE_TYPES: { [x: string]: string } = {
  VISAGE_FRONTAL_SANS_SOURIRE: "TOP_LEFT",
  VISAGE_FRONTAL_AVEC_SOURIRE: "TOP_MIDDLE",
  VISAGE_PROFIL_DROITE: "TOP_RIGHT",
  OCCLUSALE_SUPERIEURE: "MIDDLE_LEFT",
  OCCLUSALE_INFERIEURE: "MIDDLE_RIGHT",
  INTRA_ORALE_DROITE: "BOTTOM_LEFT",
  INTRA_ORALE_FRONTALE: "BOTTOM_MIDDLE",
  INTRA_ORALE_GAUCHE: "BOTTOM_RIGHT",
};

function getColumn(imageType: string): number | null {
  const position: string = INVERSE_IMAGE_TYPES[imageType];

  if (!position) {
    return null;
  }
  const [, column] = position.split("_");
  return positionMap[column];
}

function getRow(imageType: string): number | null {
  const position: string = INVERSE_IMAGE_TYPES[imageType];

  if (!position) {
    return null;
  }
  const [row] = position.split("_");
  return positionMap[row];
}

export function selectUniqueImages(imageList: CompositeImage[]) {
  const selectedImageMap = new Map();

  return imageList.map((image) => {
    if (image.type && !selectedImageMap.has(image.type)) {
      selectedImageMap.set(image.type, image);

      return {
        ...image,
        status: "SELECTED",
        position: { row: getRow(image.type), column: getColumn(image.type) },
      };
    }

    return image;
  });
}
