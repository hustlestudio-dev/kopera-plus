import { Link, usePage } from '@inertiajs/react';
import {
    Bot,
    Compass,
    FolderKanban,
    LayoutGrid,
    ShieldCheck,
    User,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
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
import type { NavGroup, NavItem } from '@/types';

// Platform-level Spatie role slugs (see App\Enums\UserRole and CreateNewUser).
// NOTE: 'administrator', not 'admin' (that one is the team-level TeamRole).
const ROLE = {
    EXPLORER: 'explorer',
    MEMBER: 'member',
    ADMIN: 'administrator',
} as const;

export function AppSidebar() {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug;
    const dashboardUrl = teamSlug ? `/${teamSlug}/dashboard` : '/';

    const userRoles = page.props.auth.user?.roles;
    const hasRole = (role: string): boolean =>
        Array.isArray(userRoles) && userRoles.includes(role);
    // Only show items the user is allowed to access. Role-less users (or users
    // without a given role) simply don't see gated items; account/settings stay
    // visible to every authenticated user.
    const canSee = (item: NavItem): boolean =>
        !item.roles?.length || item.roles.some(hasRole);

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
                { title: 'Tim', href: '/settings/teams', icon: Users },
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
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
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
