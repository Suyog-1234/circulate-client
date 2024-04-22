import { removeSelectedFile, setFileTransferName, setFileTransferPassword, setPasswordNeccessityFlag, setSelectedFiles } from '@/integration/slices/fileTransferSlice';
import { RootState } from '@/integration/store';
import { convertSize, getTotalFileSize } from '@/lib/utils';
import { TypePasswordNecessity, UploadStatus } from '@/types/file';
import { CirclePlus } from 'lucide-react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../ui/input';
import { InputPassword } from '../ui/input-password';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import UploadedFileList from './UploadedFileList';
import UploadedFileListItem from './UploadedFileListItem';

// Define props interface for UploadNotStartedUI component
interface UploadNotStartedUIProps {
    totalSize:number
    hasTransferSizeLimitExceeded:boolean
 }

// Define UploadNotStartedUI component
const UploadNotStartedUI: FC<UploadNotStartedUIProps> = ({totalSize,hasTransferSizeLimitExceeded}) => {
    const { selectedFiles, fileUploadStatus} = useSelector((state: RootState) => state.fileTransfer);
    const [passwordNecessity, setPasswordNecessity] = useState<TypePasswordNecessity>("withoutPassword");
    const [transferName, setTransferName] = useState<string>("");
    const [transferPassword, setTransferPassword] = useState<string>("");
    const [userChangedName, setUserChangedName] = useState<boolean>(false); // Flag to track user input changes

    const dispatch = useDispatch();

    // Function to handle password inclusion in transfer
    const handlePasswordIncludeInTransfer = (value: TypePasswordNecessity) => {
        setPasswordNecessity(value);
        dispatch(setPasswordNeccessityFlag(value))
    };

    // Function to handle transfer name change
    const handleTransferNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTransferName(e.target.value);
        dispatch(setFileTransferName(e.target.value)); 
        setUserChangedName(true); // Set flag to true when user manually changes the name
    };
    const handleTransferPasswordChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setTransferPassword(e.target.value)
        dispatch(setFileTransferPassword(e.target.value)); 
    }

    // Calculate total size of selected files

    // Function to add new files
    const handleNewFilesAdd = (files: FileList | null) => {
        dispatch(setSelectedFiles(files));

        // Update transfer name to the name of the first selected file if user hasn't changed it manually
        if (files && files.length > 0 && !userChangedName) {
            setTransferName(files[0].name);
            dispatch(setFileTransferName(files[0].name)); // Dispatch action to update transfer name in state
        }
    };

    // Function to remove a file
    const handleRemoveFile = async (fileName: string): Promise<void> => {
        dispatch(removeSelectedFile(fileName));
    };

    // Set initial transfer name when component mounts
    useEffect(() => {
        if (selectedFiles.length > 0 && !userChangedName) {
            setTransferName(selectedFiles[0].name);
            dispatch(setFileTransferName(selectedFiles[0].name)); // Dispatch action to update transfer name in state
        }
    }, [selectedFiles]);

    return (
        <div className={`${fileUploadStatus === UploadStatus.NOT_STARTED ? "block" : "hidden"}`}>
            <div className={`w-full ${passwordNecessity === "withPassword" ? "h-[255px]" : "h-[345px]"} flex flex-col justify-between overflow-hidden`}>
                <div className="px-5 mt-4 h-[calc(100%-58.5px)] overflow-y-auto">
                    {/* Display list of uploaded files */}
                    <UploadedFileList className="flex items-start gap-2 flex-col">
                        {selectedFiles?.map((file: File, index: number) => (
                            <UploadedFileListItem handleRemoveFile={handleRemoveFile} file={file} key={index} />
                        ))}
                    </UploadedFileList>
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                    <div className="leading-[1]">
                        {/* Input to add more files */}
                        <input multiple onChange={(e) => handleNewFilesAdd(e.target.files)} id="add-more-files" type="file" className="hidden" />
                        <label htmlFor="add-more-files" className="inline-flex items-center gap-2 cursor-pointer">
                            <CirclePlus className="text-primary" />
                            <h5 className="text-xs text-primary">Add More Files</h5>
                        </label>
                    </div>
                    {/* Display total size of selected files */}
                    <h6 className={`text-xs ${hasTransferSizeLimitExceeded ? "text-red-600" :"text-white"}`}>Total Size : {convertSize(totalSize)}</h6>
                </div>
            </div>
            <Separator className='' />
            <div className="">
                <div className="px-5 py-4">
                    {/* Radio group to choose transfer option */}
                    <RadioGroup defaultValue="link" className='flex items-center gap-4 flex-wrap'>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="link" id="link" />
                            <Label className='text-[10px] xs:text-xs md:text-xs' htmlFor="link">Get Transfer link</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mail" className='peer' disabled id="mail" />
                            <Label className='text-[10px] xs:text-xs md:text-xs' htmlFor="mail">Transfer Via Mail</Label>
                        </div>
                    </RadioGroup>
                </div>
                <Separator className='' />
                <div className="px-5 py-4">
                    <div className="">
                        {/* Input field for transfer name */}
                        <Label className=' block mb-2'>Transfer Name</Label>
                        <Input className='' value={transferName} onChange={handleTransferNameChange} />
                    </div>
                </div>
                <Separator className='' />
                <div className="px-5 py-4">
                    {/* Radio group to choose password inclusion */}
                    <RadioGroup defaultValue="withoutPassword" onValueChange={handlePasswordIncludeInTransfer} className='flex items-center gap-4 flex-wrap'>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="withPassword" id="withPassword" />
                            <Label className='text-[10px] xs:text-xs md:text-xs' htmlFor="withPassword">Transfer with password</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="withoutPassword" id="withoutPassword" />
                            <Label className='text-[10px] xs:text-xs md:text-xs' htmlFor="withoutPassword">Transfer without password</Label>
                        </div>
                    </RadioGroup>
                </div>
                {/* Display input field for transfer password if necessary */}
                {passwordNecessity === "withPassword" && (
                    <>
                        <Separator className='' />
                        <div className="px-5 py-4">
                            <div className="">
                                <Label className='block mb-2'>Transfer Password</Label>
                                <InputPassword  autoComplete='new-password' onChange={handleTransferPasswordChange}/>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UploadNotStartedUI;
