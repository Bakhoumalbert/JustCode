import { Backbutton } from '@/components/utils/BackButton'
import { Breadcrumb } from '@/components/utils/Breadcrump'
import { PropsWithChildren } from 'react'

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div>
            <div className="m-auto mt-4 max-w-2xl pl-4 ">
                <div className='flex flex-row gap-4'>
                    <Backbutton />
                    <Breadcrumb />
                </div>
            </div>
            {children}
        </div>
    )
}
