import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { cn } from '@/lib/utils';
import type { NavGroup } from '@/types';

const BADGE_STYLES: Record<string, string> = {
    AI: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Baru: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Segera: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
};

function NavBadge({ label }: { label: string }) {
    return (
        <span
            className={cn(
                'ml-auto inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none',
                BADGE_STYLES[label] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
            )}
        >
            {label}
        </span>
    );
}

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const { isCurrentOrParentUrl } = useCurrentUrl();
    const { setOpenMobile } = useSidebar();
    const cleanupMobile = useMobileNavigation();

    const closeMobileSidebar = () => {
        cleanupMobile();
        setOpenMobile(false);
    };

    return (
        <>
            {groups.map((group) => {
                const isCollapsible = group.defaultOpen === false;

                if (isCollapsible) {
                    return (
                        <CollapsibleNavGroup
                            key={group.label}
                            group={group}
                            isCurrentOrParentUrl={isCurrentOrParentUrl}
                            closeMobileSidebar={closeMobileSidebar}
                        />
                    );
                }

                return (
                    <SidebarGroup key={group.label} className="px-2 py-0">
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isCurrentOrParentUrl(item.href)}
                                        tooltip={{ children: item.title }}
                                    >
                                        <Link
                                            href={item.href}
                                            prefetch
                                            onClick={closeMobileSidebar}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            {item.badge && <NavBadge label={item.badge} />}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                );
            })}
        </>
    );
}

function CollapsibleNavGroup({
    group,
    isCurrentOrParentUrl,
    closeMobileSidebar,
}: {
    group: NavGroup;
    isCurrentOrParentUrl: (href: NonNullable<import('@inertiajs/react').InertiaLinkProps['href']>) => boolean;
    closeMobileSidebar: () => void;
}) {
    const [open, setOpen] = useState(group.defaultOpen ?? true);

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <SidebarGroup className="px-2 py-0">
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex w-full items-center justify-between">
                        {group.label}
                        <ChevronDown
                            className={cn(
                                'size-4 transition-transform',
                                open && 'rotate-180',
                            )}
                        />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarMenu>
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentOrParentUrl(item.href)}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link
                                        href={item.href}
                                        prefetch
                                        onClick={closeMobileSidebar}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        {item.badge && <NavBadge label={item.badge} />}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    );
}
