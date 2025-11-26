'use client';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '../ui/sidebar';
import { ChartAreaIcon, Package, Package2Icon } from 'lucide-react';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const DashboardSidebar = () => {
	const pathName = usePathname();
	const routes = [
		{
			icon: Package,
			route: '/',
			text: 'Product',
		},
		{
			icon: ChartAreaIcon,
			route: '/analytics',
			text: 'Analytics',
		},
	];
	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex items-center gap-3 text-blue-500 mt-2">
					<Package2Icon className="size-7" />
					<h5 className="font-manrope uppercase font-extrabold text-2xl">
						ProductSync
					</h5>
				</div>
			</SidebarHeader>
			<Separator className="mt-1" />

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{routes.map((route, i) => (
								<SidebarMenuItem key={i}>
									<Link href={route.route}>
										<SidebarMenuButton
											className={`font-manrope font-semibold flex items-center gap-2
    ${
			pathName === route.route && pathName.startsWith(route.route)
				? 'bg-blue-500 hover:bg-blue-600 hover:text-blue-100 text-white'
				: 'hover:bg-blue-600 hover:text-blue-100'
		}`}
										>
											<route.icon />
											<span>{route.text}</span>
										</SidebarMenuButton>
									</Link>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
