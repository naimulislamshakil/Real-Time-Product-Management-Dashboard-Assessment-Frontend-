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
	FacebookIcon,
	InstagramIcon,
	LockIcon,
	Mail,
	TwitterIcon,
	User,
} from 'lucide-react';
import Link from 'next/link';

export const RegisterViews = () => {
	return (
		<div>
			<Navigation />

			<div className="container mx-auto min-h-screen flex items-center justify-center py-5">
				<Card className="rounded min-w-xl">
					<CardHeader>
						<CardTitle className="font-manrope text-2xl font-bold">
							Create Your Account
						</CardTitle>
						<CardDescription className="font-manrope text-sm font-semibold">
							Join our community to discover exclusive ProductSync.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form>
							<div>
								<Label className="mb-2">Full Name</Label>
								<InputGroup className="py-5">
									<InputGroupInput type="text" placeholder="Jon Done" />
									<InputGroupAddon>
										<User />
									</InputGroupAddon>
								</InputGroup>
							</div>

							<div className="mt-5">
								<Label className="mb-2">Email Address</Label>
								<InputGroup className="py-5">
									<InputGroupInput
										type="email"
										placeholder="your@example.com"
									/>
									<InputGroupAddon>
										<Mail />
									</InputGroupAddon>
								</InputGroup>
							</div>

							<div className="mt-5">
								<Label className="mb-2">Password</Label>
								<InputGroup className="py-5">
									<InputGroupInput type="text" placeholder="************" />
									<InputGroupAddon>
										<LockIcon />
									</InputGroupAddon>
								</InputGroup>
							</div>

							<div className="mt-5">
								<Label className="mb-2">Confirm Password</Label>
								<InputGroup className="py-5">
									<InputGroupInput type="text" placeholder="************" />
									<InputGroupAddon>
										<LockIcon />
									</InputGroupAddon>
								</InputGroup>
							</div>

							<Button type="submit" className="mt-5 w-full rounded">
								Register
							</Button>
						</form>

						<div>
							<h5 className="font-manrope text-sm mt-4 font-semibold">
								You already have an account?{'  '}
								<Link href="/login">
									<span className="underline"> Please Login</span>
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
