'use client'; // Error components must be Client Components

import { LoginButton } from '@/components/features/auth/LoginButton';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <Card className="m-auto mt-4 max-w-lg">
            <CardHeader>
                <CardTitle>
                    Désolé, une erreur s&rsquo;est produite lors du traitement de votre demande.
                </CardTitle>
                <CardDescription>
                    Essayez de vous connecter à nouveau ou contactez l&rsquo;assistance si le problème persiste.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <LoginButton />
            </CardFooter>
        </Card>
    );
}