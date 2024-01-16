"use client"
import { usePathname } from 'next/navigation';
import { useIsClient } from 'usehooks-ts';
import { Button } from '../ui/button';

export const Backbutton = () => {

    const _pathname = usePathname();
    const pathname = _pathname?.split('/').filter(Boolean) ?? [];

    const isClient = useIsClient()

    if (!isClient) return;

    return (
        pathname.length > 1 &&
        <Button onClick={() => window.history.back()} variant="ghost">
            Retour
        </Button>
    )
}
