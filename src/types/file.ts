
export enum UploadStatus {
    NOT_STARTED = "Not Started",
    IN_PROGRESS = "In Progress",
    DONE = "Done",
    FAILED = "Failed"
}
export type TypePasswordNecessity = "withPassword" | "withoutPassword"

export interface FileTransferSliceStateTypes {
    liveUploadProgressPercent: number | null,
    fileUploadStatus: UploadStatus,
    uploadedFileCustomUrl: string | null
    selectedFiles: File[] | [],
    fileTransferName: string,
    fileTransferPassword: string | null
    passwordNecessity: TypePasswordNecessity
}

export interface UploadFileArgs {
    url: string;
    file: File;
    fileSize: number;
    contentType: string;
    encryptedTransferId: string;
    hasPassword: boolean;
    password: string | null;
    transferLink: string;
    transferName: string;
    totalSubFiles: number;
}

export interface FileTransferData {
    _id: string;
    user: string;
    key: string;
    transferLink: string;
    transferName: string;
    size: number;
    type: string;
    hasPassword: boolean;
    password: string | null;
    totalSubFiles: number;
    expiryDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}