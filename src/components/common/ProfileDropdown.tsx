"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useLogoutMutation } from "@/integration/api/authApi"
import { useRouter } from "next/navigation"

export function ProfileDropdown() {
    const router = useRouter()
    const [logoutFunc] = useLogoutMutation()
    const handleLogout = async ()=>{
          try {
               const response = await logoutFunc();
               if(response){
                  router.push("/auth/login")
               }
          } catch (error) {
              console.log(error)
          }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shadow-none px-2 gap-2 !pe-2">
                    <div className="w-6 h-6 bg-primary rounded-sm"></div>
                    <h6 className="text-xs">Suyog Bora</h6>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Link href={"/account"}>
                        Account
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={"/account"}>
                        Manage Workplace
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Help
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Company
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
