"use client";
import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, Trash } from 'lucide-react';
import { FC } from 'react'

interface pageProps {
    params: {
        id: string
    }
}

const page: FC<pageProps> = ({ params }) => {
    console.log(params, "params")
    return (
        <section className='section-gap'>
            <Container>
                <div className="heading">
                    <div className="mb-2">
                        <div className="flex items-center gap-4">
                            <h6 className='text-sm dark:text-white/50 text-black/50'>Not yet downloaded</h6>
                            <h6 className='text-sm dark:text-white/50 text-black/50'>2 files</h6>
                            <h6 className='text-sm dark:text-white/50 text-black/50'>2.6 kb</h6>
                            <h6 className='text-sm dark:text-white/50 text-black/50'>Send 16 Apr 2024</h6>
                        </div>
                    </div>
                    <h2 className='text-4xl font-semibold'>Your-pdf-file.pdf</h2>
                </div>
                <Separator className='my-8' />
                <div className="content">
                    <div className=""></div>
                    <div className="flex items-center gap-2">
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button variant={"outline"} size={"icon"}>
                                        <Copy className='w-4 h-4' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className='mb-1'>
                                    <p>Copy Link</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button variant={"outline"} size={"icon"}>
                                        <Trash className='w-4 h-4 text-red-700' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className='mb-1'>
                                    <p>Delete</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <Separator className='my-8' />
                <div className="grid grid-cols-2">
                    <div className="">
                        <div className="mb-6">
                            <Label className='text-sm mb-2'>
                                Expiration Date
                            </Label>
                            <h6 className='text-xs dark:text-white/50 text-black/50'>April 23, 2024</h6>
                        </div>
                        <div className="mb-6">
                            <Label className='text-sm mb-2'>
                                Password
                            </Label>
                            <h6 className='text-xs dark:text-white/50 text-black/50'>Set Password</h6>
                        </div>
                        <div className="mb-6">
                            <Label className='text-sm mb-2'>
                                Total Downloads
                            </Label>
                            <h6 className='text-xs dark:text-white/50 text-black/50'>1</h6>
                        </div>
                    </div>
                    <div className="">
                        
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default page