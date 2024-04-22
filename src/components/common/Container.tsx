import { cn } from '@/lib/utils'
import { CommonComponentProps } from '@/types/commonComponentProps'
import { FC } from 'react'

interface ContainerProps extends CommonComponentProps{
  
}

const Container: FC<ContainerProps> = ({children,className}) => {
  return (
     <div className={cn("container",className)}>
         {children}
     </div>
  )
}

export default Container