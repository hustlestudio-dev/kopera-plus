import { usePage } from '@inertiajs/react';
import {
    Bot,
    Compass,
    FolderKanban,
    LayoutGrid,
    ShieldCheck,
    User,
    Users,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { usePermissions, ROLE } from '@/lib/permissions';
import type { NavGroup, NavItem } from '@/types';

export function AppSidebar() {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug;
    const dashboardUrl = teamSlug ? `/${teamSlug}/dashboard` : '/';

    const { canAccess } = usePermissions();
    // Hide any nav item whose destination the current user cannot open. This is
    // the single standardized check shared by every gated surface, so a role can
    // never be shown a link that would 403 (e.g. explorer -> /workspace).
    const canSee = (item: NavItem): boolean =>
        item.roles ? canAccess(item.href, item.roles) : canAccess(item.href);

    // Grouping mirrors the role areas defined in routes/web.php:
    //  - Beranda: role-specific dashboards (one per platform role)
    //  - Alat Kerja: shared tools (member + administrator)
    //  - Akun: account/settings (any authenticated user)
    const navGroups: NavGroup[] = [
        {
            label: 'Beranda',
            items: [
                { title: 'Anggota', href: dashboardUrl, icon: LayoutGrid, roles: [ROLE.MEMBER] },
                { title: 'Penjelajah', href: '/explorer-dashboard', icon: Compass, roles: [ROLE.EXPLORER] },
                {
                    title: 'Administrator',
                    href: '/admin-dashboard',
                    icon: ShieldCheck,
                    roles: [ROLE.ADMIN],
                },
            ],
        },
        {
            label: 'Alat Kerja',
            items: [
                { title: 'Workspace', href: '/workspace', icon: FolderKanban, roles: [ROLE.MEMBER, ROLE.ADMIN] },
                { title: 'Asisten AI', href: '/assistant', icon: Bot, roles: [ROLE.MEMBER, ROLE.ADMIN] },
            ],
        },
        {
            label: 'Akun',
            items: [
                { title: 'Profil', href: '/settings/profile', icon: User },
                { title: 'Wilayah Koperasi', href: '/settings/teams', icon: Users },
            ],
        },
    ];

    const visibleGroups = navGroups
        .map((group) => ({ ...group, items: group.items.filter(canSee) }))
        .filter((group) => group.items.length > 0);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <TeamSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={visibleGroups} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
