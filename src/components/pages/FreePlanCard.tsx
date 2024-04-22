import { FC } from 'react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

interface FreePlanCardProps {

}

const FreePlanCard: FC<FreePlanCardProps> = ({ }) => {
    return (
        <div className="border border-border p-4">
            <div className="">
                <h3 className='text-xl font-medium mb-1'>Free</h3>
                <h6 className='text-xs dark:text-white/50 text-black/50'>Send files once in a while</h6>
            </div>
            <Separator className='my-4' />
            <div className="mb-4">
                <ul>
                    <li className='mb-2 last:mb-0'><h6 className='text-xs'>Send up to 2 GB</h6></li>
                    <li className='mb-2 last:mb-0'><h6 className='text-xs'>No need to verify transfers</h6></li>
                    <li className='mb-2 last:mb-0'><h6 className='text-xs'>Try out portals and reviews</h6></li>
                </ul>
            </div>
            <div className="">
                <h3 className='text-xl font-medium mb-1'>0 Rs</h3>
                <h6 className='text-xs dark:text-white/50 text-black/50'>no money, no problem</h6>
            </div>
            <Separator className='my-4' />
            <div className="">
                <Button variant={"outline"} disabled className='w-full'>
                    Upgrade
                </Button>
            </div>
        </div>
    )
}

export default FreePlanCard