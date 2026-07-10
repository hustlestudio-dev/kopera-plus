import { Link, router, usePage } from '@inertiajs/react';
import { Check, LogOut, Settings } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

type Props = {
    user: User;
};

type SharedProps = {
    locale?: 'id' | 'en';
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();
    const { locale = 'id' } = usePage<SharedProps>().props;

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const switchLocale = (nextLocale: 'id' | 'en') => {
        cleanup();

        if (locale === nextLocale || typeof window === 'undefined') {
            return;
        }

        const url = new URL(window.location.href);
        url.searchParams.set('lang', nextLocale);

        router.visit(`${url.pathname}${url.search}${url.hash}`, {
            replace: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full cursor-pointer"
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        Pengaturan
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault();
                        switchLocale('id');
                    }}
                >
                    <span className="flex w-full items-center justify-between">
                        <span>Bahasa Indonesia</span>
                        {locale === 'id' ? <Check className="h-4 w-4" /> : null}
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault();
                        switchLocale('en');
                    }}
                >
                    <span className="flex w-full items-center justify-between">
                        <span>English</span>
                        {locale === 'en' ? <Check className="h-4 w-4" /> : null}
                    </span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full cursor-pointer"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Keluar
                </Link>
            </DropdownMenuItem>
        </>
    );
}
