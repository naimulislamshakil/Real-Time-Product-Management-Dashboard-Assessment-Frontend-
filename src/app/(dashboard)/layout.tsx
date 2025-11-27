import { DashboardNavigation } from '@/components/common/dashboard-navigation';
import { DashboardSidebar } from '@/components/common/dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className="flex min-h-screen">
			<SidebarProvider>
				<DashboardSidebar />
				<main className="flex-1">
					<DashboardNavigation />
					<div className="p-5">{children}</div>
				</main>
			</SidebarProvider>
		</div>
	);
};

export default Layout;
