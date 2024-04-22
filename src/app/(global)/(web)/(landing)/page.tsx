"use client";
import FileDraggedUI from '@/components/pages/FileDraggedUI';
import FileUploaderCircularUI from '@/components/pages/FileUploaderCircularUI';
import MegaFileUploaderDropzone from '@/components/pages/MegaFileUploaderDropzone';
import UploadFailedUI from '@/components/pages/UploadFailedUI';
import UploadNotStartedUI from '@/components/pages/UploadNotStartedUI';
import UploadingDoneUI from '@/components/pages/UploadingDoneUI';
import UploadingInProgressUI from '@/components/pages/UploadingInProgressUI';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { usePreFileUploadMutation, useUploadFileMutation } from '@/integration/api/fileTransferApi';
import { setFileTransferName, setFileTransferPassword, setFileUploadingStatus, setPasswordNeccessityFlag, setSelectedFiles, setSelectedFilesEmpty, setUploadedFileCustomUrl } from '@/integration/slices/fileTransferSlice';
import { RootState } from '@/integration/store';
import { getEncryptedTransferId, getTotalFileSize } from '@/lib/utils';
import { UploadFileArgs, UploadStatus } from '@/types/file';
import JSZip from "jszip";
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface PageProps { }

const Page: FC<PageProps> = ({ }) => {
    const [hasFileDragged, setHasFileDragged] = useState<boolean>(false);
    const [hasTransferSizeLimitExceeded, setHasTransferSizeLimitExceeded] = useState<boolean>(false);
    const [totalFilesSize, setTotalFilesSize] = useState<number>(0);
    const { liveUploadProgressPercent, fileUploadStatus, uploadedFileCustomUrl, selectedFiles, fileTransferName, fileTransferPassword, passwordNecessity } = useSelector((state: RootState) => state.fileTransfer);
    const [preUploadMutation] = usePreFileUploadMutation();
    const [uploadFile] = useUploadFileMutation();
    const dispatch = useDispatch();

    const handleNewFilesAdd = (files: File[] | null) => {
        dispatch(setSelectedFiles(files))
    }

    useEffect(() => {
        const totalSize = getTotalFileSize(selectedFiles)
        setTotalFilesSize(totalSize)
        if (totalSize > 50 * 1024 * 1024) {
            setHasTransferSizeLimitExceeded(true)
        } else {
            setHasTransferSizeLimitExceeded(false)
        }

    }, [selectedFiles]);

    const handleGenerateTransferLink = async (): Promise<void> => {
        dispatch(setFileUploadingStatus(UploadStatus.IN_PROGRESS));
        const hasPassword = passwordNecessity === "withPassword" ? true : false
        console.log(hasPassword)
        const encryptedTransferId = getEncryptedTransferId(fileTransferName!, selectedFiles, hasPassword)
        try {
            if (selectedFiles.length === 1) {
                const result: any = await preUploadMutation({ fileKey: encryptedTransferId, contentType: selectedFiles[0].type }).unwrap();
                if (result) {
                    const fileBody:UploadFileArgs = {
                        url: result.url,
                        file: selectedFiles[0],
                        fileSize: selectedFiles[0].size,
                        contentType: selectedFiles[0].type,
                        encryptedTransferId,
                        hasPassword,
                        password: fileTransferPassword,
                        transferLink: `http://localhost:3000/download/${encryptedTransferId}`,
                        transferName: fileTransferName, totalSubFiles: selectedFiles.length
                    }
                    uploadFile(fileBody)
                }
            } else if (selectedFiles.length > 1) {
                const zip: JSZip = new JSZip();
                selectedFiles.forEach(file => {
                    zip.file(file.name, file);
                });
                const content: Blob = await zip.generateAsync({ type: 'blob' });
                const zipFile: File = new File([content], encryptedTransferId, { type: 'application/zip' });
                const result: any = await preUploadMutation({ fileKey: zipFile.name, contentType: zipFile.type }).unwrap();
                if (result) {
                    const fileBody:UploadFileArgs = {
                        url: result.url,
                        file: zipFile,
                        fileSize: zipFile.size,
                        contentType: 'application/zip',
                        encryptedTransferId,
                        hasPassword,
                        password: fileTransferPassword,
                        transferLink: `http://localhost:3000/download/${encryptedTransferId}`,
                        transferName: fileTransferName, totalSubFiles: selectedFiles.length
                    }
                    uploadFile(fileBody)
                }
            }
        } catch (error) {
            dispatch(setFileUploadingStatus(UploadStatus.FAILED))
        }
    };

    const handleUploadAgain = () => {
        dispatch(setFileUploadingStatus(UploadStatus.NOT_STARTED))
    }
    const handleSendNew = () => {
        dispatch(setSelectedFilesEmpty())
        dispatch(setFileTransferPassword(""))
        dispatch(setPasswordNeccessityFlag("withoutPassword"))
        dispatch(setFileTransferName(""))
        dispatch(setFileUploadingStatus(UploadStatus.NOT_STARTED))
        dispatch(setUploadedFileCustomUrl(null))
    }
    return (
        <section className='upload-section min-h-[calc(100vh-61px)] relative'>
            <MegaFileUploaderDropzone setHasFileDragged={setHasFileDragged} onFileUpload={handleNewFilesAdd}>
                {
                    selectedFiles.length === 0 ? <div className="w-full">
                        <FileUploaderCircularUI onFileUpload={handleNewFilesAdd} />
                    </div> : (
                        <div className="w-full max-w-[460px] h-[600px] overflow-hidden border border-border bg-popover rounded-md">
                            <div className="h-[calc(100%-64px)]">
                                {
                                    <>
                                        <div className={`${fileUploadStatus == UploadStatus.NOT_STARTED ? "block h-full" : "hidden"}`}>
                                            <UploadNotStartedUI totalSize={totalFilesSize} hasTransferSizeLimitExceeded={hasTransferSizeLimitExceeded} />
                                        </div>
                                        <div className={`${fileUploadStatus == UploadStatus.IN_PROGRESS ? "block h-full" : "hidden"}`}>
                                            <UploadingInProgressUI percentage={liveUploadProgressPercent} />
                                        </div>
                                        <div className={`${fileUploadStatus == UploadStatus.DONE ? "block h-full" : "hidden"}`}>
                                            <UploadingDoneUI url={uploadedFileCustomUrl} />
                                        </div>
                                        <div className={`${fileUploadStatus == UploadStatus.FAILED ? "block h-full" : "hidden"}`}>
                                            <UploadFailedUI />
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="">
                                <Separator className='' />
                                <div className="footer px-5 py-4 flex items-center justify-center">
                                    {
                                        fileUploadStatus == UploadStatus.NOT_STARTED &&
                                        <Button size={"sm"} disabled={
                                            selectedFiles.length === 0 ||
                                            (
                                                passwordNecessity === "withPassword" &&
                                                (fileTransferPassword === "" || fileTransferPassword === null)
                                            ) || hasTransferSizeLimitExceeded
                                        } className="w-full" onClick={handleGenerateTransferLink}>
                                            Get Transfer Link
                                        </Button>
                                    }
                                    {
                                        fileUploadStatus == UploadStatus.IN_PROGRESS &&
                                        <Button size={"sm"} disabled={selectedFiles.length === 0} className="w-full">
                                            cancel
                                        </Button>
                                    }
                                    {
                                        fileUploadStatus == UploadStatus.DONE &&
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            <Button size={"sm"} disabled={selectedFiles.length === 0} className="w-full">
                                                Copy Link
                                            </Button>
                                            <Button size={"sm"} variant={"outline"} className="w-full" onClick={handleSendNew}>
                                                Send New
                                            </Button>
                                        </div>
                                    }
                                    {
                                        fileUploadStatus == UploadStatus.FAILED &&
                                        <Button size={"sm"} disabled={selectedFiles.length === 0} className="w-full" onClick={handleUploadAgain}>
                                            Go Back And Try Uploading Again
                                        </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    hasFileDragged && <FileDraggedUI />
                }
            </MegaFileUploaderDropzone>
        </section>
    )
}

export default Page