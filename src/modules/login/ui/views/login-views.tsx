'use client';
import { Navigation } from '@/components/common/navigation';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import {
	Eye,
	EyeClosed,
	FacebookIcon,
	InstagramIcon,
	LockIcon,
	Mail,
	TwitterIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schema/login-schema';

interface Data {
	email: string;
	password: string;
}

export const LoginViews = () => {
	const [passwordType, setPasswordType] = useState(false);
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = (data: Data) => {
		console.log(data);
	};
	return (
		<div>
			<Navigation />
			<div className="container mx-auto min-h-screen flex items-center justify-center">
				<Card className="rounded min-w-xl">
					<CardHeader>
						<CardTitle className="font-manrope text-2xl font-bold">
							Welcome Back
						</CardTitle>
						<CardDescription className="font-manrope text-sm font-semibold">
							Log in to access your account.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div>
								<Label className="mb-2">Email Address</Label>
								<InputGroup className="py-5">
									<InputGroupInput
										type="email"
										{...register('email')}
										placeholder="your@example.com"
									/>
									<InputGroupAddon>
										<Mail />
									</InputGroupAddon>
								</InputGroup>

								{errors.email && (
									<p className="text-red-500 text-sm mt-1 font-manrope">
										{errors.email.message}
									</p>
								)}
							</div>

							<div className="mt-5">
								<Label className="mb-2">Password</Label>
								<InputGroup className="py-5">
									<InputGroupInput
										{...register('password')}
										type={passwordType === false ? 'password' : 'text'}
										placeholder="************"
									/>
									<InputGroupAddon>
										<LockIcon />
									</InputGroupAddon>
									<InputGroupAddon
										onClick={() => setPasswordType(!passwordType)}
										align="inline-end"
									>
										{passwordType === false ? <Eye /> : <EyeClosed />}
									</InputGroupAddon>
								</InputGroup>
								{errors.password && (
									<p className="text-red-500 text-sm mt-1 font-manrope">
										{errors.password.message}
									</p>
								)}
							</div>

							<Button type="submit" className="mt-5 w-full rounded">
								Login
							</Button>
						</form>

						<div>
							<h5 className="font-manrope text-sm mt-4 font-semibold">
								Don't have an account?{'  '}
								<Link href="/register">
									<span className="underline"> Please create an account.</span>
								</Link>
							</h5>
						</div>

						<div className="flex items-center gap-4 my-6">
							<div className="h-px flex-1 bg-gray-300"></div>
							<span className="text-gray-500 text-sm font-medium font-manrope">
								Or continue with
							</span>
							<div className="h-px flex-1 bg-gray-300"></div>
						</div>

						<div className="grid grid-cols-3 gap-x-3">
							<Button className="rounded" variant="outline">
								<FacebookIcon className="size-5" />
								Facebook
							</Button>
							<Button className="rounded" variant="outline">
								<TwitterIcon className="size-5" />
								Twiter
							</Button>
							<Button className="rounded" variant="outline">
								<InstagramIcon className="size-5" />
								Instagram
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
