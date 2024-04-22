// fileTransferApi.ts

import axios from 'axios';
import { setFileUploadingStatus, setUploadedFileCustomUrl, updateLiveProgress } from '../slices/fileTransferSlice';
import { rootApiSlice } from './rootApiSlice';
import { UploadStatus } from '@/types/file';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Define a service using a base URL and expected endpoints
export const fileTransferApi = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
       getAllFileLogs:builder.query<any,void>({
         query:()=>({
           url:"user/file/all-file-log",
           method:"GET"
         }),
         providesTags:["files"]
       })
    }),
});

export const {useGetAllFileLogsQuery} = fileTransferApi; // Export useUploadFileMutation here
