'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

interface ProtectedRouteProps {
	children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = Cookies.get('token');
		console.log(token);

		if (!token) {
			toast.error('You must login first');
			router.push('/login');
		} else {
			setLoading(false);
		}
	}, [router]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				Loading...
			</div>
		);
	}

	return <>{children}</>;
};
