'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Controller, useForm } from 'react-hook-form';
import { categories, productStatus } from '../../array/category';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import { yupResolver } from '@hookform/resolvers/yup';
import { addProductSchema } from '../../schema/add-product-schema';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useEffect } from 'react';
import {
	Product,
	useAddProductMutation,
	useEditProductMutation,
} from '../../api/product-slice';

interface Props {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
	onClose: () => void;
	product: Product;
	id: string;
}

interface Data {
	productName: string;
	price: number;
	category: string;
	status: string;
	stock: number;
	description: string;
	image: string;
}

export default function Modal({
	isOpen,
	setOpen,
	onClose,
	product,
	id,
}: Props) {
	const [addProduct, { isError, isLoading, isSuccess, error, data }] =
		useAddProductMutation();
	const [editProduct, { isSuccess: isEditSuccess, isError: isEditError }] =
		useEditProductMutation();

	useEffect(() => {
		if (isSuccess) {
			toast.success(data?.message);
		}
		if (error) {
			toast.error(error?.data?.message);
		}
	}, [error, data, isError, isLoading, isSuccess]);

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(addProductSchema),
	});

	useEffect(() => {
		if (!product) return; // only run when product actually arrives

		reset({
			productName: product.productName ?? '',
			price: product.price ?? '',
			category: product.category ?? '',
			status: product.status ?? '',
			stock: product.stock ?? '',
			description: product.description ?? '',
			image: product.image ?? '',
		});
	}, [product]);

	const uploadImage = async (e: any) => {
		const img = e.target.files?.[0];
		const formData = new FormData();
		formData.append('image', img);

		fetch(
			'https://api.imgbb.com/1/upload?key=d0d47d94eb134fce1b62cbfcda5f8e95',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					toast.success('Image upload successfully.');
					setValue('image', data?.data?.display_url);
				}
			})
			.catch((err) => console.log(err));
	};

	const onSubmit = async (input: Data) => {
		try {
			if (product) {
				await editProduct({ id, data: input }).unwrap();
				toast.success('Product update successfully!');
				reset();
				setOpen(false);
			} else {
				await addProduct(input).unwrap();
				toast.success('Product added successfully!');
				reset();
				setOpen(false);
			}
		} catch (err: any) {
			toast.error(err.data?.message || 'Something went wrong!');
		}
	};
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			onClick={onClose}
		>
			<Card
				className="rounded min-w-3xl h-[80vh] overflow-y-auto"
				onClick={(e) => e.stopPropagation()}
			>
				<CardHeader>
					<CardTitle className="text-2xl font-semibold font-manrope">
						{product ? 'Edit Product' : 'Add New Product'}
					</CardTitle>
					<CardDescription className="text-sm font-manrope">
						{product
							? 'You can edit your product here.'
							: 'You can add your product here.'}
					</CardDescription>
					<Separator className="mt-2" />
				</CardHeader>

				<CardContent>
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
									render={({ field }) => (
										<Select
											value={field.value || ''}
											onValueChange={field.onChange}
										>
											<SelectTrigger className="w-full rounded">
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>

											<SelectContent>
												<SelectGroup>
													{categories.map((c) => (
														<SelectItem key={c.value} value={c.value}>
															{c.text}
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
									render={({ field }) => (
										<Select
											value={field.value || ''}
											onValueChange={field.onChange}
										>
											<SelectTrigger className="w-full rounded">
												<SelectValue placeholder="Select a status" />
											</SelectTrigger>

											<SelectContent>
												<SelectGroup>
													{productStatus.map((s) => (
														<SelectItem key={s.value} value={s.value}>
															{s.text}
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

						<div className="mt-5">
							<Label className="mb-2 font-manrope">Product Image</Label>
							<Input type="file" accept="image/*" onChange={uploadImage} />
						</div>

						<div className="flex items-end justify-end">
							<Button
								type="submit"
								className="rounded mt-5 bg-blue-500 hover:bg-blue-600 text-white"
							>
								{product ? 'Edit Product' : 'Add Product'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
