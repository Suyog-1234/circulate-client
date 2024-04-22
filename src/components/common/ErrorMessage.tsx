import { FC } from 'react'

interface ErrorMessageProps {
    error?:string
}

const ErrorMessage: FC<ErrorMessageProps> = ({error}) => {
  return (
      <p className='text-xs text-red-700 font-medium mt-2 capitalize'>{error}</p>
  )
}

export default ErrorMessage