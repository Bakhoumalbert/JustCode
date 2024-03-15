'use client';

import { useFormStatus } from './useFormStatus';
import { Button, ButtonProps } from '../ui/button';

export const SubmitButton = (props: ButtonProps) => {
    const { pending } = useFormStatus();
    return <Button {...props} disabled={pending} />;
};
