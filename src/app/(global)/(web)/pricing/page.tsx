import Container from '@/components/common/Container'
import FreePlanCard from '@/components/pages/FreePlanCard'
import ProPlanCard from '@/components/pages/ProPlanCard'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return (
        <section className="section-gap">
            <Container>
                <div className="max-w-[60%] mx-auto">
                    <div className="mb-10">
                        <div className="">
                            <h2 className='text-4xl text-center font-semibold mb-4 leading-[1.5]'>You’ve got the ideas,
                                we’ve got the plans</h2>
                            <p className='text-xs text-center text-accent-foreground'>Whether you’re sending big files for fun or delivering work for clients—keep creative projects moving forward with WeTransfer.</p>
                        </div>
                    </div>
                    <div className=""></div>
                    <div className="grid grid-cols-2 gap-10">
                        <FreePlanCard/>
                        <ProPlanCard/>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default page