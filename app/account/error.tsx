'use client'; // Error components must be Client Components

import { LoginButton } from '@/components/features/auth/LoginButton';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
                <CardTitle>Vous devez vous connecter pour voir cette page!</CardTitle>
            </CardHeader>
            <CardFooter>
                <LoginButton />
            </CardFooter>
        </Card>
    );
}