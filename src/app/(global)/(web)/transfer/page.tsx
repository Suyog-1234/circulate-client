"use client";

import Container from '@/components/common/Container'
import TransferedFileUI from '@/components/pages/TransferedFileUI'
import { Button } from '@/components/ui/button'
import { useGetAllFileLogsQuery } from '@/integration/api/fileTransferLogsApi'
import { FileTransferData } from '@/types/file';
import { Info, Trash } from 'lucide-react'
import { FC } from 'react'

interface pageProps {

}

const Page: FC<pageProps> = ({ }) => {
    const {data}= useGetAllFileLogsQuery();
    return (
        <section className='section-gap'>
            <Container>
                <div className="heading mb-10">
                    <h3 className='dark:text-white/50 text-black/50 mb-4'>SUYOG’S WORKSPACE</h3>
                    <h2 className='text-4xl font-semibold'>Transfers</h2>
                </div>
                <div className="content">
                     {
                         data?.data?.map((fileLog:FileTransferData,index:number)=>{
                             return <TransferedFileUI fileLog={fileLog} key={index}/>
                         })
                     }
                </div>
            </Container>
        </section>
    )
}

export default Page