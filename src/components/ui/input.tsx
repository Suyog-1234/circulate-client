import * as React from "react"

import { cn } from "@/lib/utils"
import ErrorMessage from "../common/ErrorMessage"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { 
    error?:string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,error,...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
         {error && <ErrorMessage error={error}/>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
