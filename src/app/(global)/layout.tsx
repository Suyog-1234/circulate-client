import Header from '@/components/layout/Header'
import { CommonComponentProps } from '@/types/commonComponentProps'
import { FC } from 'react'

interface layoutProps extends CommonComponentProps {

}

const layout: FC<layoutProps> = ({ children }) => {
    return (
        <div className="layout-wrapper">
            <Header />
            <main className='pt-[61px]'>
                {children}
            </main>
        </div>
    )
}

export default layout