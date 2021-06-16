import { User } from "types/User";

export interface Job {
  id: string;
  user: User;
  externalIdPatient: string;
  inputImages: Image[];
  processedImages: Image[];
  template: Image;
  progress: number;
  country?: string;
  city?: string;
  eu?: string;
  timezone?: string;
  totalSizeInputImagesMB?: number;
  uploadSpeedMBps?: number;
  uploadTimeS?: number;
  clientTypeFrom?: string;
  clientNameFrom?: string;
  sentToDataScienceAt?: string;
  timeDatascienceProcessS?: number;
  timeTotalProcessS?: number;
  createdAt: string;
  updatedAt: string;
  urlWebpageProgression: string;
  urlZip?: string;
}

export interface Image {
  id: string;
  idJob: string;
  idOriginalImage: string;
  filename: string;
  user: User;
  url: string;
  type: ImageTypeEnum;
  batchParameters: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any; // Don't know what are the key of this parameter
  };
  createdAt: string;
  updatedAt: string;
  editedUrl?: string;
}

export enum ImageTypeEnum {
  INTRA_ORALE_FRONTALE = "INTRA_ORALE_FRONTALE",
  INTRA_ORALE_GAUCHE = "INTRA_ORALE_GAUCHE",
  INTRA_ORALE_DROITE = "INTRA_ORALE_DROITE",
  OCCLUSALE_INFERIEURE = "OCCLUSALE_INFERIEURE",
  OCCLUSALE_SUPERIEURE = "OCCLUSALE_SUPERIEURE",
  VISAGE_FRONTAL_SANS_SOURIRE = "VISAGE_FRONTAL_SANS_SOURIRE",
  VISAGE_PROFIL_DROITE = "VISAGE_PROFIL_DROITE",
  VISAGE_FRONTAL_AVEC_SOURIRE = "VISAGE_FRONTAL_AVEC_SOURIRE",
  VISAGE_TROIS_QUARTS = "VISAGE_TROIS_QUARTS",
  AUTRE = "AUTRE",
  VISAGE_FRONTAL_DESSOUS = "VISAGE_FRONTAL_DESSOUS",
}
