"use client";

import React, { FC, useCallback } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface FileUploaderCircularUIProps {
  onFileUpload: (file: File[]) => void;
}

const FileUploaderCircularUI: FC<FileUploaderCircularUIProps> = ({ onFileUpload }) => {
  return (
    <div className="xl:max-w-[50%] mx-auto flex items-center justify-center flex-col gap-10 md:-mt-14">
      <div className="">
        <h2 className='text-4xl text-center font-semibold mb-4 leading-[1.5]'>Transfer and have your files travel for free</h2>
        <p className='text-xs text-center text-accent-foreground'>Circulate is a simple and free way to safely share your data</p>
      </div>
      <TooltipProvider>
        <Tooltip delayDuration={0} open>
          <TooltipTrigger asChild>
            <div className='relative w-[200px] h-[200px]'>
              <label htmlFor='upload' className="cursor-pointer">
                <div className="w-full h-full bg-white rounded-full border-[13px] border-t-[#FF620899] border-r-[#FF6208] border-b-[#FF6208C9] border-l-[#FF6208B3] mx-auto animate-spin-slow shadow-uploader">
                </div>
                <h5 className='text-primary font-medium text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Upload</h5>
              </label>
              <input multiple onChange={(e) =>onFileUpload(Array.from(e.target.files as FileList))} type="file" id='upload' className='hidden' />
            </div>
          </TooltipTrigger>
          <TooltipContent avoidCollisions={false} side='bottom' className='max-w-[180px] p-4 w-full mt-6 relative overflow-visible before:w-4 before:h-4 before:bg-primary before:absolute before:-top-[8px] before:left-1/2 before:-translate-x-1/2 before:rotate-45'>
            <h5 className='text-center break-words leading-[1.5] text-xs font-600'>Click or drag-and-drop your files here</h5>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default FileUploaderCircularUI