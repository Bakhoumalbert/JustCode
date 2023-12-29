"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { useIsClient } from 'usehooks-ts';
import { Typography } from '../ui/Typography';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export const Breadcrumbs = () => {

    const _pathname = usePathname();
    const pathname = _pathname?.split('/').filter(Boolean) ?? [];
    const lastsegment = pathname[pathname.length - 1]

    const isClient = useIsClient()

    if (!isClient) return;

    return (
        <div className='flex items-center'>
            {
                pathname.map((path, index) => (
                    <div key={index} className="flex items-center">
                        <Link href={
                            index > 0 ? `/admin/${pathname.slice(1, index + 1).join("/")}` : "/admin"} className='flex flex-row'>
                            <Typography variant="base" className={cn(path !== lastsegment ? "text-gray-600" : "text-gray", "capitalize hover:text-gray-700 animate")}>
                                {pathname.indexOf(path) === 2 ? path.slice(0, 2) + ".." + path.slice(path.length - 2) : pathname.indexOf(path) === 4 ? path.slice(0, 1) + ".." + path.slice(path.length - 2) : path.replace(/-/g, " ")}
                            </Typography>
                            {
                                (lastsegment !== path) &&
                                <div className='flex items-center pt-1'>
                                    <ChevronRight className="" size={16} />
                                </div>
                            }
                        </Link>
                    </div >
                ))}
        </div>
    )
}
