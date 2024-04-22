import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileTransferSliceStateTypes, TypePasswordNecessity, UploadStatus } from "@/types/file";

const initialState: FileTransferSliceStateTypes = {
    liveUploadProgressPercent: null,
    fileUploadStatus: UploadStatus.NOT_STARTED,
    uploadedFileCustomUrl: null,
    selectedFiles: [],
    fileTransferName:"",
    fileTransferPassword:null,
    passwordNecessity:"withoutPassword",
};

const fileTransferSlice = createSlice({
    name: "fileTransfer",
    initialState,
    reducers: {
        // Update live upload progress
        updateLiveProgress: (state, action: PayloadAction<number | null>) => {
            state.liveUploadProgressPercent = action.payload;
        },
        // Set file uploading status
        setFileUploadingStatus: (state, action: PayloadAction<UploadStatus>) => {
            state.fileUploadStatus = action.payload;
        },
        // Set uploaded file custom URL
        setUploadedFileCustomUrl: (state, action: PayloadAction<string | null>) => {
            state.uploadedFileCustomUrl = action.payload;
        },
        // Set selected files
        setSelectedFiles: (state, action: PayloadAction<File[] | FileList | null >) => {
            const incomingFiles = action.payload;
            if (incomingFiles) {
                const combinedFiles: File[] = [...state.selectedFiles, ...Array.from(incomingFiles)];
                const uniqueFiles = Array.from(new Set(combinedFiles.map(file => file.name))).map(name => combinedFiles.find(file => file.name === name));
                state.selectedFiles = uniqueFiles as File[];
            }
        },
        setSelectedFilesEmpty :(state) => {
            state.selectedFiles = []
        },
        // Remove selected file
        removeSelectedFile: (state, action: PayloadAction<string>) => {
            const fileName = action.payload;
            state.selectedFiles = state.selectedFiles.filter((file: File) => file.name !== fileName);
        },
        setFileTransferName: (state, action: PayloadAction<string>) => {
            state.fileTransferName =action.payload
        },
        setFileTransferPassword: (state, action: PayloadAction<string>) => {
            state.fileTransferPassword = action.payload
        },
        setPasswordNeccessityFlag: (state, action: PayloadAction<TypePasswordNecessity>) => {
            state.passwordNecessity = action.payload
        },
    }
});

// Export actions and reducer
export const { updateLiveProgress, setFileUploadingStatus, setUploadedFileCustomUrl, setSelectedFiles, removeSelectedFile ,setFileTransferName,setFileTransferPassword,setPasswordNeccessityFlag,setSelectedFilesEmpty} = fileTransferSlice.actions;
export default fileTransferSlice.reducer;
