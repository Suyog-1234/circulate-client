import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOffIcon } from "lucide-react"
import ErrorMessage from "../common/ErrorMessage"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
        error?:string
     }

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type,error ,...props }, ref) => {
        const[showPass,setShowPass] = React.useState(false)
        return (
           <>
              <div className="relative">
                <input
                    type={showPass ? "text":"password"}
                    className={cn(
                        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <span className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" onClick={()=>setShowPass(!showPass)}>
                      {
                         !showPass ?  <Eye className="w-5 h-5"/> :  <EyeOffIcon className="w-5 h-5"/>
                      }
                </span>
            </div>
            {error && <ErrorMessage error={error}/>}
           </>
        )
    }
)
InputPassword.displayName = "Input"

export { InputPassword }
