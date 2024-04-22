import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertSize = (sizeBytes: number) => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let size = sizeBytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

export const getFileExtension = (filename: string): string => {
  const lastDotIndex: number = filename.lastIndexOf(".");
  if (lastDotIndex === -1) {
    // No dot found in the filename, return an empty string
    return "";
  }
  return filename.slice(lastDotIndex + 1);
};

export const getFileNameWithoutExtension = (filename: string): string => {
  const lastDotIndex: number = filename.lastIndexOf(".");
  if (lastDotIndex === -1) {
    // No dot found in the filename, return the filename as it is
    return filename;
  }
  return filename.slice(0, lastDotIndex);
};


export const getEncryptedTransferId = (transferName: string, selectedFiles: File[], hasPassword: boolean): string => {
  const uniqueId: string = uuidv4();
  const timeStamp: string = new Date().toISOString().replace(/\D/g, '');
  const sanitizedTransferName: string = transferName.replace(/\s+/g, '_');
  const fileExtension: string = selectedFiles.length > 1 ? "zip" : getFileExtension(selectedFiles[0].name);
  const passwordIndicator: string = hasPassword ? "withPwd" : "noPwd";
  const transferId: string = `${uniqueId}-${timeStamp}--${sanitizedTransferName}__${fileExtension}__${passwordIndicator}`;
  const encryptedId: string = CryptoJS.AES.encrypt(transferId, 'encryption_secret_key').toString();
  return encryptedId;
};


export const getTotalFileSize = (selectedFiles:File[])=>{
  const totalFilesSize = selectedFiles.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.size;
  }, 0);
  return totalFilesSize
}