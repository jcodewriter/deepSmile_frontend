import { Job, ImageTypeEnum } from "types/Job";

export interface PixPhotoProcessorStateProps {
  step: PhotoProcessorStep;
  editorState: EditorState;
  compositeState: CompositeState;
  jobState: JobState;
}

export interface PixPhotoProcessorActionPayload {
  setEditorState?: {
    state: boolean;
  };
  setPEProcessing?: {
    jobId: string;
  };
  setPEGallery?: {
    processedJob: Job;
  };
}

export enum PixPhotoProcessorActionType {
  SET_EDITOR_STATE = "SET_EDITOR_ON",
  SET_STEP = "SET_STEP",
  SET_PE_PROCESSING = "SET_PE_PROCESSING",
  SET_PE_GALLERY = "SET_PE_GALLERY",
  SET_PE_COMPOSITE = "SET_PE_COMPOSITE",
  RESET_PHOTO_PROCESSOR = "RESET_PHOTO_PROCESSOR",
  SET_COMPOSITE_INITIALIZED = "SET_COMPOSITE_INITIALIZED",
  SET_COMPOSITE_IMAGE_LIST = "SET_COMPOSITE_IMAGE_LIST",
  SET_COMPOSITE_LOADING = "SET_COMPOSITE_LOADING",
  SET_COMPOSITE_READ_ONLY = "SET_COMPOSITE_READ_ONLY",
  SELECT_COMPOSITE_IMAGE = "SELECT_COMPOSITE_IMAGE",
  UNSELECT_COMPOSITE_IMAGE = "UNSELECT_COMPOSITE_IMAGE",
  SET_COMPOSITE_LOGO_SOURCE = "SET_COMPOSITE_LOGO_SOURCE",
  REPLACE_COMPOSITE_IMAGE = "REPLACE_COMPOSITE_IMAGE",
  START_EDIT_IMAGE = "START_EDIT_IMAGE",
  CANCEL_EDIT_IMAGE = "CANCEL_EDIT_IMAGE",
  FINISH_EDIT_IMAGE = "FINISH_EDIT_IMAGE",
  SET_JOB_STATUT = "SET_JOB_STATUT",
  SET_JOB_PROGRESS = "SET_JOB_PROGRESS",
  SET_TEMPLATE_STATUS = "SET_TEMPLATE_STATUS",
  TRIGGER_DOWNLOAD = "TRIGGER_DOWNLOAD",
  RESET_DOWNLOAD_COUNTER = "RESET_DOWNLOAD_COUNTER",
  UPDATE_PROCESSED_IMAGE_URL = "UPDATE_PROCESSED_IMAGE_URL",
  UPDATE_TEMPLATE_ZIP_URL = "UPDATE_TEMPLATE_ZIP_URL",
}

export interface PixPhotoProcessorAction {
  type: PixPhotoProcessorActionType;
  payload?: PixPhotoProcessorActionPayload;
}

export type _PixPhotoProcessorAction =
  | { type: PixPhotoProcessorActionType.SET_EDITOR_STATE; state: boolean }
  | { type: PixPhotoProcessorActionType.SET_STEP; step: PhotoProcessorStep }
  | { type: PixPhotoProcessorActionType.SET_PE_PROCESSING; jobId: string }
  | { type: PixPhotoProcessorActionType.SET_PE_GALLERY; processedJob?: Job }
  | { type: PixPhotoProcessorActionType.SET_PE_COMPOSITE }
  | { type: PixPhotoProcessorActionType.RESET_PHOTO_PROCESSOR }
  | { type: PixPhotoProcessorActionType.SET_COMPOSITE_INITIALIZED; isInitialized: boolean }
  | { type: PixPhotoProcessorActionType.SET_COMPOSITE_IMAGE_LIST; imageList: CompositeImage[] }
  | { type: PixPhotoProcessorActionType.SET_COMPOSITE_LOADING; isLoading: boolean }
  | { type: PixPhotoProcessorActionType.SET_COMPOSITE_READ_ONLY; readOnly: boolean }
  | {
      type: PixPhotoProcessorActionType.SELECT_COMPOSITE_IMAGE;
      payload: {
        imageId: string;
        position: Position;
      };
    }
  | {
      type: PixPhotoProcessorActionType.UNSELECT_COMPOSITE_IMAGE;
      imageId: string;
    }
  | {
      type: PixPhotoProcessorActionType.SET_COMPOSITE_LOGO_SOURCE;
      logoSrc: string;
    }
  | {
      type: PixPhotoProcessorActionType.REPLACE_COMPOSITE_IMAGE;
      payload: {
        oldImageId: string;
        newImageId: string;
      };
    }
  | {
      type: PixPhotoProcessorActionType.START_EDIT_IMAGE;
      imageId: string;
    }
  | {
      type: PixPhotoProcessorActionType.FINISH_EDIT_IMAGE;
      payload: {
        imageId: string | undefined;
        src: string;
        params: EditParams;
        editorSrc: string;
      };
    }
  | { type: PixPhotoProcessorActionType.CANCEL_EDIT_IMAGE }
  | {
      type: PixPhotoProcessorActionType.SET_JOB_STATUT;
      payload: {
        jobId: string;
        status: JOB_STATUTES;
      };
    }
  | { type: PixPhotoProcessorActionType.SET_JOB_PROGRESS; progress: number }
  | { type: PixPhotoProcessorActionType.SET_TEMPLATE_STATUS; status: TEMPLATE_STATUTES }
  | { type: PixPhotoProcessorActionType.TRIGGER_DOWNLOAD }
  | { type: PixPhotoProcessorActionType.RESET_DOWNLOAD_COUNTER }
  | {
      type: PixPhotoProcessorActionType.UPDATE_PROCESSED_IMAGE_URL;
      payload: {
        imageId: string;
        editedUrl: string;
      };
    }
  | { type: PixPhotoProcessorActionType.UPDATE_TEMPLATE_ZIP_URL; url?: string };

export enum PhotoProcessorStep {
  WAITING_FOR_FILES,
  PROCESSING,
  GALLERY,
  COMPOSITE,
}

export enum JOB_STATUTES {
  IDLE = "IDLE",
  PREPARING = "PREPARING",
  UPLOADING = "UPLOADING",
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

export enum TEMPLATE_STATUTES {
  IDLE = "IDLE",
  UPLOADING = "UPLOADING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

export interface JobState {
  jobId?: string;
  job?: Job;
  jobProgress: number;
  jobStatus: JOB_STATUTES;
  error?: {
    [x: string]: string;
  };
  templateStatus: TEMPLATE_STATUTES;
  downloadCounter: number;
}

export interface EditorState {
  isOn: boolean;
}

export interface CompositeState {
  imageList: CompositeImage[];
  editingImage?: CompositeImage;
  logo: string;
  readOnly: boolean;
  isInitialized: boolean;
  isLoading?: boolean;
}

export interface EditParams {
  translate: {
    x: number;
    y: number;
  };
  scale: number;
  rotate: number;
}

export interface CompositeImage {
  id: string;
  type: ImageTypeEnum;
  status?: string;
  src: string;
  filename: string;
  editorSrc: string;
  processedSrc: string;
  originalSrc?: string;
  editParams?: EditParams;
  position: Position;
  aspectRatio?: number;
  naturalWidth: number;
  naturalHeight: number;
}

export interface TemplateImage {
  id: string;
  url: string;
  filename: string;
  originalUrl?: string;
  type: ImageTypeEnum;
}

export type Position = {
  [x: string]: number | null;
};

export enum IMAGE_TYPES {
  TOP_LEFT = "VISAGE_FRONTAL_SANS_SOURIRE",
  TOP_MIDDLE = "VISAGE_FRONTAL_AVEC_SOURIRE",
  TOP_RIGHT = "VISAGE_PROFIL_DROITE",
  MIDDLE_LEFT = "OCCLUSALE_SUPERIEURE",
  MIDDLE_RIGHT = "OCCLUSALE_INFERIEURE",
  BOTTOM_LEFT = "INTRA_ORALE_DROITE",
  BOTTOM_MIDDLE = "INTRA_ORALE_FRONTALE",
  BOTTOM_RIGHT = "INTRA_ORALE_GAUCHE",
}
