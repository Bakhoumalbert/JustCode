import { useState } from 'react';

export const useFormStatus = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (submitFunction: () => Promise<void>) => {
        setPending(true);
        try {
            await submitFunction(); // Exécuter la fonction de soumission du formulaire
            setError(null); // Effacer les éventuelles erreurs
        } catch (err) {
            setError('Une erreur est survenue lors de la soumission du formulaire.');
        }
        setPending(false);
    };

    return { pending, error, handleSubmit };
};
