import { FC } from 'react'

interface FileDraggedUIProps {
  
}

const FileDraggedUI: FC<FileDraggedUIProps> = ({}) => {
  return <div className='absolute top-0 left-0 w-full h-full bg-primary flex items-center justify-center z-[99]'>
       <h2 className='text-2xl font-semibold capitalize'>Drop your Files Here</h2>
  </div>
}

export default FileDraggedUI