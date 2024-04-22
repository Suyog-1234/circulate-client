"use client";

import { FC } from 'react'
import { Button } from '../ui/button'
import { Copy, Info, Trash } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileTransferData } from '@/types/file';
import { convertSize} from '@/lib/utils';

interface TransferedFileUIProps {
    fileLog:FileTransferData
}

const TransferedFileUI: FC<TransferedFileUIProps> = ({fileLog}) => {
    const {_id,expiryDate,createdAt,hasPassword,key,password,size,totalSubFiles,transferLink,transferName,type,updatedAt,user} =fileLog
    const router = useRouter()
    const handleInfoBtnClick = ()=>{
        router.push("/transfer/1")
    }
    return (
        <div className="w-full border border-border p-4 flex items-center gap-4 justify-between mb-2">
            <div className="">
                <Link href="/transfer/1" className='text-sm text-primary inline-block mb-2'>{transferName}</Link>
                <div className="flex items-center gap-4">
                    <h6 className='text-xs dark:text-white/50 text-black/50'>Not yet downloaded</h6>
                    <h6 className='text-xs dark:text-white/50 text-black/50'>{totalSubFiles} files</h6>
                    <h6 className='text-xs dark:text-white/50 text-black/50'>{convertSize(size)}</h6>
                    <h6 className='text-xs dark:text-white/50 text-black/50'>Send 16 Apr 2024</h6>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button variant={"outline"} size={"icon"}>
                                <Copy className='w-4 h-4' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className='mb-1'>
                            <p>Copy Link</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button variant={"outline"} size={"icon"} onClick={()=>handleInfoBtnClick()}>
                                <Info className='w-4 h-4 text-blue-700' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className='mb-1'>
                            <p>View Details</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                                <Button variant={"outline"} size={"icon"}>
                                    <Trash className='w-4 h-4 text-red-700' />
                                </Button>
                        </TooltipTrigger>
                        <TooltipContent className='mb-1'>
                            <p>Delete</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default TransferedFileUI