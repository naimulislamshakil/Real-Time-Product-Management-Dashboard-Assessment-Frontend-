'use client';

import { Controller, useForm } from 'react-hook-form';
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { categories, productStatus } from '../../array/category';
import { yupResolver } from '@hookform/resolvers/yup';
import { addProductSchema } from '../../schema/add-product-schema';

interface Data {
	productName: string;
	price: number;
	category: string;
	status: string;
	stock: number;
	description: string;
	image: string;
}

export default function AddProductModal() {
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			productName: '',
			price: 0,
			category: '',
			status: '',
			stock: 0,
			description: '',
		},
		resolver: yupResolver(addProductSchema),
	});

	const onSubmit = (data: Data) => {
		console.log('Form Submitted:', data);
		reset();
		setOpen(false);
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button className="rounded font-manrope font-semibold bg-blue-500 hover:bg-blue-600 text-white">
					<PlusCircleIcon />
					Add New Product
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent className="rounded max-h-[80vh] overflow-y-auto">
				<AlertDialogHeader>
					<AlertDialogTitle>Add New Product</AlertDialogTitle>
					<AlertDialogDescription>
						You can add your product here.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<Separator />

				<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
					<div>
						<Label className="mb-2 font-manrope">Product Name</Label>
						<Input
							type="text"
							{...register('productName')}
							className="rounded p-5 font-manrope"
							placeholder="Enter your product name."
						/>
						{errors.productName && (
							<p className="text-red-500 text-sm mt-1">
								{errors.productName.message}
							</p>
						)}
					</div>

					<div className="flex items-center justify-between gap-5 mt-5">
						<div className="w-full">
							<Label className="mb-2 font-manrope">Product Price</Label>
							<InputGroup>
								<InputGroupInput
									type="number"
									{...register('price', { valueAsNumber: true })}
									className="rounded p-5 font-manrope"
									placeholder="200.00"
								/>
								<InputGroupAddon>$</InputGroupAddon>
							</InputGroup>
							{errors.price && (
								<p className="text-red-500 text-sm mt-1">
									{errors.price.message}
								</p>
							)}
						</div>

						<div className="w-full">
							<Label className="mb-2 font-manrope">Category</Label>
							<Controller
								name="category"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className="w-full rounded">
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>

										<SelectContent className="rounded">
											<SelectGroup>
												{categories.map((categorie) => (
													<SelectItem
														key={categorie.value}
														value={categorie.value}
													>
														{categorie.text}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							/>
							{errors.category && (
								<p className="text-red-500 text-sm mt-1">
									{errors.category.message}
								</p>
							)}
						</div>
					</div>

					<div className="flex items-center justify-between gap-5 mt-5">
						<div className="w-full">
							<Label className="mb-2 font-manrope">Status</Label>
							<Controller
								name="status"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<Select
										value={field.value}
										onValueChange={(val) => field.onChange(val)}
									>
										<SelectTrigger className="w-full rounded">
											<SelectValue placeholder="Select a status" />
										</SelectTrigger>

										<SelectContent className="rounded">
											<SelectGroup>
												{productStatus.map((status) => (
													<SelectItem key={status.value} value={status.value}>
														{status.text}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							/>
							{errors.status && (
								<p className="text-red-500 text-sm mt-1">
									{errors.status.message}
								</p>
							)}
						</div>

						<div className="w-full">
							<Label className="mb-2 font-manrope">Product Stock QTY</Label>
							<Input
								type="number"
								{...register('stock', { valueAsNumber: true })}
								placeholder="Stock QTY"
								className="font-manrope rounded"
							/>
							{errors.stock && (
								<p className="text-red-500 text-sm mt-1">
									{errors.stock.message}
								</p>
							)}
						</div>
					</div>

					<div className="mt-5">
						<Label className="mb-2 font-manrope">Product Description</Label>
						<Textarea
							{...register('description')}
							rows={5}
							className="rounded p-5 font-manrope"
							placeholder="Enter your product description."
						/>
					</div>

					{/* <div className="mt-5">
						<Label className="mb-2 font-manrope">Product Image</Label>
						<Input type="file" className="rounded font-manrope" />
					</div> */}

					<AlertDialogFooter className="mt-6">
						<AlertDialogCancel className="rounded">Cancel</AlertDialogCancel>
						<Button
							type="submit"
							className="rounded bg-blue-600 text-white hover:bg-blue-700"
						>
							Save Product
						</Button>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
