import { SiteConfig } from '@/lib/site-config';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../ui/Typography';

export const Footer = () => {
    return (
        <footer className="mt-2 w-full border-t border-card">
            <div className="m-auto w-full max-w-3xl px-2 py-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <Image
                            src="/images/you-code.svg"
                            width={40}
                            height={30}
                            alt="app logo"
                        />
                        <Typography variant="base" as={Link} href="/" className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-xl font-extrabold text-transparent'>
                            {SiteConfig.title}
                        </Typography>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
                        <Link className="hover:underline" href="/legal/privacy">
                            Privacy
                        </Link>
                        <Link className="hover:underline" href="/legal/cgv">
                            CGV
                        </Link>
                        <Link className="hover:underline" href="/courses">
                            Courses
                        </Link>
                        <Link className="hover:underline" href="/admin">
                            Admin
                        </Link>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center">
                    <Typography variant="base" className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} {SiteConfig.title} by ASB
                    </Typography>
                </div>
            </div>
        </footer>
    );
};
