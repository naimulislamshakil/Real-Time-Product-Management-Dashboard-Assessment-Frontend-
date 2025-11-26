'use client';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Toaster } from 'sonner';

const manrope = Manrope({
	variable: '--font-geist-manrope',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${manrope.variable} antialiased`}>
				<Provider store={store}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					></ThemeProvider>
					{children}
				</Provider>
				<Toaster />
			</body>
		</html>
	);
}
