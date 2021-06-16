import { EditParams } from "./PhotoProcessorContext";

export interface Position {
  row: 1 | 2 | 3;
  column: 1 | 2 | 3;
}

export interface TemplateImage {
  id: string;
  url: string;
  originalUrl: string;
  type: string;
}

export interface CompositeImage {
  id: string;
  type: string;
  status: "SELECTED" | "UNSELECTED";
  src: string;
  editorSrc: string;
  processedSrc: string;
  originalSrc: string;
  editParams: EditParams;
  position: Position | null;
  aspectRatio: number | null;
  naturalWidth: number;
  naturalHeight: number;
}

export interface PixPhotosCompositeStateProps {
  imageList: CompositeImage[];
  editingImage?: CompositeImage | null;
  logo?: string | null;
  readOnly?: boolean;
  isInitialized?: boolean;
  isLoading?: boolean;
}

export interface PixPhotosCompositeActionPayload {
  isInitialized?: boolean;
  imageList?: CompositeImage[];
  isLoading?: boolean;
  imageId?: string;
  position?: Position;
  src?: string;
  params?: null;
  editorSrc?: string;
  oldImageId?: string;
  newImageId?: string;
}

export enum PixPhotosCompositeActionType {
  SET_INITIALIZED = "SET_INITIALIZED",
  SET_IMAGE_LIST = "SET_IMAGE_LIST",
  SET_LOADING = "SET_LOADING",
  SELECT_IMAGE = "SELECT_IMAGE",
  UNSELECT_IMAGE = "UNSELECT_IMAGE",
  SET_LOGO_SOURCE = "SET_LOGO_SOURCE",
  START_EDIT_IMAGE = "START_EDIT_IMAGE",
  FINISH_EDIT_IMAGE = "FINISH_EDIT_IMAGE",
  CANCEL_EDIT_IMAGE = "CANCEL_EDIT_IMAGE",
  REPLACE_IMAGE = "REPLACE_IMAGE",
}

export interface PixPhotosCompositeAction {
  type: PixPhotosCompositeActionType;
  payload?: PixPhotosCompositeActionPayload;
}
