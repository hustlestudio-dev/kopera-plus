import { usePage } from '@inertiajs/react';
import {
    BookOpen,
    Bot,
    Brain,
    Coins,
    Compass,
    FileBarChart,
    FileText,
    Gift,
    Globe,
    GraduationCap,
    Heart,
    Landmark,
    LayoutGrid,
    PiggyBank,
    Pill,
    ShoppingCart,
    Store,
    Truck,
    User,
    UserCog,
    Users,
    Vote,
    FolderKanban,
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
    const canSee = (item: NavItem): boolean =>
        item.roles
            ? canAccess(String(item.href), item.roles)
            : canAccess(String(item.href));

    const navGroups: NavGroup[] = [
        {
            label: 'Beranda',
            items: [
                {
                    title: 'AI Insight',
                    href: '/admin-dashboard',
                    icon: Brain,
                    roles: [ROLE.ADMIN],
                },
                {
                    title: 'Dashboard',
                    href: dashboardUrl,
                    icon: LayoutGrid,
                    roles: [ROLE.MEMBER],
                },
                {
                    title: 'Penjelajah',
                    href: '/explorer-dashboard',
                    icon: Compass,
                    roles: [ROLE.EXPLORER],
                },
            ],
        },
        {
            label: 'Keanggotaan & Warga',
            items: [
                {
                    title: 'Formulir-AI Onboarding',
                    href: '/admin-dashboard#onboarding',
                    icon: FileText,
                    roles: [ROLE.ADMIN],
                    badge: 'AI',
                },
                {
                    title: 'Anggota + Gamifikasi',
                    href: '/rewards',
                    icon: Users,
                    roles: [ROLE.ADMIN, ROLE.MEMBER],
                    badge: 'Baru',
                },
                {
                    title: 'Program Magang',
                    href: '/admin-dashboard#magang',
                    icon: GraduationCap,
                    roles: [ROLE.ADMIN],
                    badge: 'Segera',
                },
            ],
        },
        {
            label: 'Usaha & Transaksi',
            items: [
                {
                    title: 'Penjualan-AI Commerce',
                    href: '/assistant',
                    icon: ShoppingCart,
                    roles: [ROLE.ADMIN, ROLE.MEMBER],
                    badge: 'AI',
                },
                {
                    title: 'Off-Taker',
                    href: '#',
                    icon: Truck,
                    roles: [ROLE.ADMIN],
                    badge: 'Segera',
                },
            ],
        },
        {
            label: 'Tata Kelola & Transparansi',
            items: [
                {
                    title: 'e-RAT',
                    href: '/e-rat',
                    icon: Vote,
                    roles: [ROLE.ADMIN, ROLE.MEMBER],
                },
                {
                    title: 'Laporan Keuangan',
                    href: '/admin-dashboard#laporan',
                    icon: FileBarChart,
                    roles: [ROLE.ADMIN],
                },
                {
                    title: 'SHU-AI Explainer',
                    href: '/admin-dashboard#shu',
                    icon: Coins,
                    roles: [ROLE.ADMIN],
                    badge: 'AI',
                },
            ],
        },
        {
            label: 'Alat Kerja',
            items: [
                {
                    title: 'Workspace',
                    href: '/workspace',
                    icon: FolderKanban,
                    roles: [ROLE.MEMBER, ROLE.ADMIN],
                },
                {
                    title: 'Asisten AI',
                    href: '/assistant',
                    icon: Bot,
                    roles: [ROLE.MEMBER, ROLE.ADMIN],
                },
            ],
        },
        {
            label: 'Komunitas',
            items: [
                {
                    title: 'Kopdes Community',
                    href: '/community',
                    icon: Globe,
                    roles: [ROLE.ADMIN, ROLE.EXPLORER, ROLE.MEMBER],
                },
                {
                    title: 'Artikel / Knowledge',
                    href: '/community#artikel',
                    icon: BookOpen,
                    roles: [ROLE.ADMIN, ROLE.EXPLORER, ROLE.MEMBER],
                },
            ],
        },
        {
            label: 'Rewards',
            items: [
                {
                    title: 'Poin & Hadiah',
                    href: '/rewards',
                    icon: Gift,
                    roles: [ROLE.MEMBER, ROLE.ADMIN],
                },
            ],
        },
        {
            label: 'Lainnya',
            defaultOpen: false,
            items: [
                {
                    title: 'Simpanan',
                    href: '#',
                    icon: PiggyBank,
                    roles: [ROLE.ADMIN],
                },
                {
                    title: 'Pinjaman',
                    href: '#',
                    icon: Landmark,
                    roles: [ROLE.ADMIN],
                },
                {
                    title: 'Penyedia',
                    href: '#',
                    icon: Store,
                    roles: [ROLE.ADMIN],
                },
                {
                    title: 'Karyawan',
                    href: '#',
                    icon: UserCog,
                    roles: [ROLE.ADMIN],
                },
                {
                    title: 'Klinik Desa',
                    href: '#',
                    icon: Heart,
                    roles: [ROLE.ADMIN],
                },
                {
                    title: 'Apotek Desa',
                    href: '#',
                    icon: Pill,
                    roles: [ROLE.ADMIN],
                },
            ],
        },
        {
            label: 'Akun',
            items: [
                {
                    title: 'Profil',
                    href: '/settings/profile',
                    icon: User,
                },
                {
                    title: 'Wilayah Koperasi',
                    href: '/settings/teams',
                    icon: Users,
                    roles: [ROLE.MEMBER, ROLE.ADMIN],
                },
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
