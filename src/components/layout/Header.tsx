"use client";

import { FC } from 'react'
import { ThemeToggle } from '../common/ThemeToggle'
import Link from 'next/link'
import Container from '../common/Container'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux';
import { RootState } from '@/integration/store';
import { useGetMyAccountQuery } from '@/integration/api/authApi';
import Loader from '../common/Loader';
import { ProfileDropdown } from '../common/ProfileDropdown';

interface HeaderProps {

}

const Header: FC<HeaderProps> = ({ }) => {
    const pathname = usePathname();
    const { data, isLoading } = useGetMyAccountQuery();
    const { token } = useSelector((state: RootState) => state.auth)
    return (
        <header className='py-3 border-b border-border fixed top-0 left-0 w-full z-30 bg-background'>
            <Container>
                <div className="header-wrapper flex items-center justify-between">
                    <div className="logo-part">
                        <Link href={"/"} className='text-primary text-2xl font-medium'>Circulate</Link>
                    </div>
                    <div className="action-part flex items-center gap-4">

                        {
                            !isLoading ? <>
                                {
                                    !token ? (
                                        <div className="border border-border rounded-sm overflow-hidden">
                                            <ul className='flex items-center'>
                                                <li className='border-e border-border last:border-e-0'>
                                                    <Link href={"/auth/login"} className={`${pathname == "/auth/login" ? "bg-accent" : ""} text-xs font-medium py-[9px] px-4 min-w-[90px] flex items-center justify-center hover:bg-accent hover:text-accent-foreground`}>
                                                        Login
                                                    </Link>
                                                </li>
                                                <li className='border-e border-border last:border-e-0'>
                                                    <Link href={"/auth/register"} className='text-xs font-medium py-[9px] px-4 min-w-[90px] flex items-center justify-center hover:bg-accent hover:text-accent-foreground'>
                                                        Register
                                                    </Link>
                                                </li>
                                                <li className='border-e border-border last:border-e-0'>
                                                    <Link href={"/pricing"} className='text-xs font-medium py-[9px] px-4 min-w-[90px] flex items-center justify-center hover:bg-accent hover:text-accent-foreground'>
                                                        Pricing
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : (

                                        <div className="flex items-center gap-4">
                                            <div className="border border-border rounded-sm overflow-hidden">
                                                <ul className='flex items-center'>
                                                    <li className='border-e border-border last:border-e-0'>
                                                        <Link href={"/transfer"} className={`${pathname == "/auth/login" ? "bg-accent" : ""} text-xs font-medium py-[9px] px-4 min-w-[90px] flex items-center justify-center hover:bg-accent hover:text-accent-foreground`}>
                                                            Transfers
                                                        </Link>
                                                    </li>
                                                    <li className='border-e border-border last:border-e-0'>
                                                        <Link href={"/pricing"} className='text-xs font-medium py-[9px] px-4 min-w-[90px] flex items-center justify-center hover:bg-accent hover:text-accent-foreground'>
                                                            Pricing
                                                        </Link>
                                                    </li>
                                                    <li className='border-e border-border last:border-e-0'>
                                                        <Link href={"/pricing"} className='text-xs font-medium py-[9px] px-4 min-w-[90px] flex items-center justify-center hover:bg-accent hover:text-accent-foreground'>
                                                            Upgrade
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <ProfileDropdown />
                                        </div>
                                    )
                                }
                            </> : <div className="w-8 h-8 hover:bg-accent hover:text-accent-foreground flex items-center justify-center border border-border">
                                <Loader className='w-4 h-4' />
                            </div>
                        }
                        <ThemeToggle />
                    </div>
                </div>
            </Container>
        </header >
    )
}

export default Header