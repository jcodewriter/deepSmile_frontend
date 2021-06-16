import { FaceZoomLevel, OcclusalCut, IntraOralZoomLevel } from "src/shared/types/User";

export interface FunnelVariables {
  faceZoomLevel: FaceZoomLevel;
  faceBackgroundColor: string;
  occlusalCut: OcclusalCut;
  intraOralZoomLevel: IntraOralZoomLevel;
  useMirror: boolean;
  useMirrorOcclusal: boolean;
  autoSoftwareFlip: boolean;
}

export interface FaceZoomStepPayload {
  faceZoomLevel: FaceZoomLevel;
}

export interface FaceBGColorStepPayload {
  faceBackgroundColor: string;
}

export interface OcclusalCutStepPayload {
  occlusalCut: OcclusalCut;
}

export interface IntraOralZoomStepPayload {
  intraOralZoomLevel: IntraOralZoomLevel;
}

export interface MirrorStepPayload {
  useMirror: boolean;
  useMirrorOcclusal: boolean;
  autoSoftwareFlip: boolean;
}
