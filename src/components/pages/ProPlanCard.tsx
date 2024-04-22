import { FC } from 'react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

interface ProPlanCardProps {

}

const ProPlanCard: FC<ProPlanCardProps> = ({ }) => {
    return (
        <div className="border border-primary p-4">
            <div className="">
                <h3 className='text-xl font-semibold mb-1 text-primary'>Pro</h3>
                <h6 className='text-xs dark:text-white/50 text-black/50'>Send files once in a while</h6>
            </div>
            <Separator className='my-4' />
            <div className="mb-4">
                <ul>
                    <li className='mb-2 last:mb-0'><h6 className='text-xs'>Send and receive up to 200 GB</h6></li>
                    <li className='mb-2 last:mb-0'><h6 className='text-xs'>1 TB storage per person</h6></li>
                    <li className='mb-2 last:mb-0'><h6 className='text-xs'>5 portals, unlimited reviews</h6></li>
                </ul>
            </div>
            <div className="">
                <h3 className='text-xl font-medium mb-1 text-primary'>500 Rs/month</h3>
                <h6 className='text-xs dark:text-white/50 text-black/50'>per person, billed yearly</h6>
            </div>
            <Separator className='my-4' />
            <div className="">
                <Button className='w-full'>
                    Current Plan
                </Button>
            </div>
        </div>
    )
}

export default ProPlanCard