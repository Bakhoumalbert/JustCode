import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { SiteConfig } from '@/lib/site-config';
import Image from 'next/image';
import Link from 'next/link';
import { AuthButton } from '../features/auth/AuthButton';
import { Typography } from '../ui/Typography';

export function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background px-2">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex items-center gap-2">
                    <Image src="/images/logo.png" width={50} height={35} alt="app logo" />
                    <div className="flex items-baseline gap-2">
                        <Typography variant="h3" as={Link} href="/">
                            <h3 className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-2xl font-extrabold text-transparent'>
                                {SiteConfig.title}
                            </h3>
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <div className='flex gap-2'>
                        <Typography
                            as={Link}
                            variant="link"
                            href="/explorer"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Explorer
                        </Typography>
                        <Typography
                            as={Link}
                            variant="link"
                            href="/courses"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Courses
                        </Typography>
                    </div>
                    <nav className="flex items-center space-x-1">
                        <AuthButton />
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}