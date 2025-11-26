'use client';
import {
	BellIcon,
	ChevronDown,
	HomeIcon,
	Menu,
	MessageCircle,
	Moon,
	SearchIcon,
	Sun,
	UsersIcon,
	X,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '../ui/input-group';
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar } from '../ui/avatar';
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';

export const DashboardNavigation = () => {
	const pathName = usePathname();
	const { theme, setTheme } = useTheme();
	const router = useRouter();
	return (
		<div>
			<nav className="w-full bg-background border-b">
				<div className="container mx-auto flex items-center px-3 md:px-0 justify-between py-3">
					<div className="flex items-center gap-10 w-lg">
						<SidebarTrigger />

						<InputGroup className="w-full rounded-full border border-blue-500">
							<InputGroupInput placeholder="Search by product name and id..." />
							<InputGroupAddon>
								<SearchIcon className="text-blue-500" />
							</InputGroupAddon>
						</InputGroup>
					</div>

					<div className="flex items-center gap-5">
						<Button
							onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
							className="hidden md:flex"
							variant="ghost"
						>
							{theme === 'light' ? (
								<Moon className="w-5 h-5 text-blue-500" />
							) : (
								<Sun className="w-5 h-5 text-blue-500" />
							)}
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-3">
								<Avatar>
									<AvatarImage src="/profile.jpg" />
								</Avatar>
								<span>Naimul</span>
								<ChevronDown size={18} className="text-gray-500" />
							</DropdownMenuTrigger>

							<DropdownMenuContent>
								<DropdownMenuLabel>My Profile</DropdownMenuLabel>
								<Separator />

								<DropdownMenuItem>
									<Link href="/login" className="w-full">
										Login
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href="/register" className="w-full">
										Register
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem></DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</nav>
		</div>
	);
};
