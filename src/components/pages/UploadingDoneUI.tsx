import { url } from 'inspector'
import { FC } from 'react'
import { Input } from '../ui/input'
import { CircleCheckBig } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/integration/store'

interface UploadingDoneUIProps {
    url: string | null
}

const UploadingDoneUI: FC<UploadingDoneUIProps> = ({ url }) => {
 
    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex items-center justify-center flex-col gap-3">
                <div className="max-w-[60%] mx-auto text-center flex items-center justify-center flex-col">
                    <div className="mb-3">
                        <CircleCheckBig className='w-20 h-20 text-primary' />
                    </div>
                    <h4 className='text-xl font-semibold  mb-3'>Done</h4>
                    <p className='text-xs font-500 leading-[1.8]'>Copy Below Url And Send In Order To Download File</p>
                </div>
                <Input type="text" value={url as string} className='text-ellipsis' />
            </div>
        </div>
    )
}

export default UploadingDoneUI