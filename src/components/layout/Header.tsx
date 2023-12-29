// src/components/layout/Header.tsx
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";
import { AuthButton } from "../features/auth/AuthButton";

export function Header() {

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <Image
                    src="/images/you-code.svg"
                    width={40}
                    height={35}
                    alt="app logo"
                />
                <div className="flex gap-6 md:gap-10">
                    <Typography variant="h3" as={Link} href="/">
                        {SiteConfig.title}
                    </Typography>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <AuthButton />
                    <nav className="flex items-center space-x-1">
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}
