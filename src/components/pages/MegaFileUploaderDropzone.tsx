"use client";

import React, { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';
import { CommonComponentProps } from '@/types/commonComponentProps';

interface MegaFileUploaderDropzone extends CommonComponentProps {
  onFileUpload: (file: File[]) => void
  setHasFileDragged:Dispatch<SetStateAction<boolean>>
}

const MegaFileUploaderDropzone: FC<MegaFileUploaderDropzone> = ({children,onFileUpload,setHasFileDragged}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the file
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive }: {
    getRootProps: () => DropzoneRootProps;
    getInputProps: () => DropzoneInputProps;
    isDragActive: boolean
  } = useDropzone({ onDrop, noClick: true });

   useEffect(()=>{
    setHasFileDragged(isDragActive)
   },[isDragActive])

  return (
    <div className={`w-full min-h-[inherit] flex md:items-center justify-center py-10 lg:py-12 xl:py-20 px-4`} {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  )
}

export default MegaFileUploaderDropzone