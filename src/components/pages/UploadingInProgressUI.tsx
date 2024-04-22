import { FC } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

interface UploadingInProgressUIProps {
  percentage: number | null
}

const UploadingInProgressUI: FC<UploadingInProgressUIProps> = ({ percentage }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-3">
        <div className="w-28 h-28 mb-3">
          <CircularProgressbar styles={buildStyles({ pathColor: "hsla(20.5 90.2% 48.2%)", textColor: "hsla(20.5 90.2% 48.2%)",textSize:"14px"})} value={percentage ?? 0} text={`${percentage ?? 0}%`} />
        </div>
        <div className="max-w-[60%] mx-auto text-center">
          <h4 className='text-xl font-semibold  mb-3'>Transferring...</h4>
          <p className='text-xs font-500 leading-[1.8]'>Wrapping up...
            Do not close this window until we complete the transfer.</p>
        </div>
      </div>
    </div>
  )
}

export default UploadingInProgressUI