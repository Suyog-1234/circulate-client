// fileTransferApi.ts

import axios from 'axios';
import { setFileUploadingStatus, setUploadedFileCustomUrl, updateLiveProgress } from '../slices/fileTransferSlice';
import { rootApiSlice } from './rootApiSlice';
import { UploadFileArgs, UploadStatus } from '@/types/file';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Define a service using a base URL and expected endpoints
export const fileTransferApi = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        preFileUpload: builder.mutation<FetchBaseQueryError, any>({
            query: (obj) => ({
                url: `user/file/pre-upload`,
                method: 'POST',
                body: obj,
            }),
        }),
        preFileDownload: builder.mutation<any, any>({
            query: (obj) => ({
                url: `user/file/pre-download`,
                method: 'POST',
                body: obj,
            }),
            onQueryStarted: () => {

            }
        }),
        uploadFile: builder.mutation<any, UploadFileArgs>({
            queryFn: async (args, api, extraOptions, baseQuery) => {
                const { contentType, encryptedTransferId, file, url, fileSize, hasPassword, password, totalSubFiles, transferLink, transferName } = args
                const { dispatch} = api
                try {
                    const response = await axios.put(url, file, {
                        headers: {
                            "Content-Type": contentType
                        },
                        onUploadProgress: (progressEvent) => {
                            const uploadedPercentage = (progressEvent.loaded / file.size) * 100;
                            dispatch(updateLiveProgress(Math.floor(uploadedPercentage)));
                        }
                    })
                    if (response.status === 200) {
                        dispatch(setFileUploadingStatus(UploadStatus.DONE));
                        dispatch(setUploadedFileCustomUrl(`http://localhost:3000/download/${encryptedTransferId}`))
                        const fileLogObj = {
                            key:encryptedTransferId,
                            size:fileSize,
                            type:contentType,
                            hasPassword,
                            password,
                            transferLink,
                            transferName,
                            totalSubFiles
                        }
                        const refreshResult: any = await baseQuery({
                            url: "user/file/add-file-log",
                            method: "POST",
                            body:fileLogObj,
                        });
                        dispatch(rootApiSlice.util.invalidateTags(["files"]))
                        console.log(refreshResult, "refreshResultrefreshResultrefreshResult")
                    }
                    return response.data
                } catch (error: any) {
                    dispatch(setFileUploadingStatus(UploadStatus.FAILED));
                    dispatch(setUploadedFileCustomUrl(null))
                }
            },
        }),
        downloadFile: builder.query<ArrayBuffer, { url: string }>({
            query: ({ url }) => ({
                url: url,
                method: "GET",
                responseHandler: (response) => response.arrayBuffer(),
            }),
        }),
    }),
});

export const { usePreFileUploadMutation, usePreFileDownloadMutation, useUploadFileMutation, useLazyDownloadFileQuery } = fileTransferApi; // Export useUploadFileMutation here
