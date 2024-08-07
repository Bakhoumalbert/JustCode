import { BackButton } from '@/components/utils/BackButton';
import { Breadcrumb } from '@/components/utils/Breadcrump';
import { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <>
            <div className="w-full border-b border-border/20">
                <div className="m-auto flex max-w-3xl items-center gap-2 px-4 py-1">
                    <BackButton variant="ghost" size="sm">
                        Retour
                    </BackButton>
                    <Breadcrumb />
                </div>
            </div>
            {children}
        </>
    );
}