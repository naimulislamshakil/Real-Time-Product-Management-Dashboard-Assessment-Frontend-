'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Edit2Icon, EllipsisVerticalIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { Product, useDeleteProductMutation } from '../../api/product-slice';
import { productStatus } from '../../array/category';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const statusColors: Record<string, string> = {
	in_stock: 'bg-green-100 text-green-800',
	out_of_stock: 'bg-red-100 text-red-800',
	low_stock: 'bg-yellow-100 text-yellow-800',
	pre_order: 'bg-blue-100 text-blue-800',
	upcoming: 'bg-purple-100 text-purple-800',
	active: 'bg-green-200 text-green-900',
	inactive: 'bg-gray-200 text-gray-800',
	draft: 'bg-gray-100 text-gray-700',
	published: 'bg-blue-200 text-blue-900',
	archived: 'bg-gray-300 text-gray-900',
	on_sale: 'bg-pink-100 text-pink-800',
	discontinued: 'bg-red-200 text-red-900',
};

export const columns = (
	handleDelete: (id: string) => void
): ColumnDef<Product>[] => [
	{
		accessorKey: 'image',
		header: 'Image',
		cell: ({ row }) => {
			const imgSrc = row.getValue('image') as string;

			return (
				<div className="flex items-center gap-2">
					{imgSrc ? (
						<Image
							src={imgSrc}
							width={70}
							height={70}
							className="rounded-2xl"
							alt="product"
						/>
					) : (
						<div className="w-16 h-16 bg-gray-200 rounded-2xl" />
					)}
				</div>
			);
		},
	},

	{
		accessorKey: 'productName',
		header: 'Product Name',
		cell: ({ row }) => {
			const name = row.getValue('productName') as string;
			return <span className="text-sm font-manrope capitalize">{name}</span>;
		},
	},

	{
		accessorKey: 'sku',
		header: 'SKU',
		cell: ({ row }) => (
			<span className="text-sm font-manrope">{row.getValue('sku')}</span>
		),
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell: ({ row }) => {
			const category = row.getValue('category') as string;
			const formatted = category.replace(/_/g, ' ');

			return (
				<span className="text-sm font-manrope capitalize">{formatted}</span>
			);
		},
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => (
			<span className="text-sm font-manrope">$ {row.getValue('price')}</span>
		),
	},
	{
		accessorKey: 'stock',
		header: 'Stock',
		cell: ({ row }) => (
			<span className="text-sm font-manrope">{row.getValue('stock')}</span>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const value = row.getValue('status') as string;
			const status = productStatus.find((s) => s.value === value);
			const formatted = status?.text || value.replace(/_/g, ' ');
			const colorClass = statusColors[value] || 'bg-gray-100 text-gray-800';

			return (
				<span
					className={`text-sm font-manrope capitalize px-2 py-1 rounded ${colorClass}`}
				>
					{formatted}
				</span>
			);
		},
	},
	{
		id: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const productId = row.original.id;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<EllipsisVerticalIcon />
					</DropdownMenuTrigger>

					<DropdownMenuContent className="rounded">
						<Link href="/">
							<DropdownMenuItem>
								<Edit2Icon />
								<span className="text-sm font-manrope font-semibold">
									Edit Product
								</span>
							</DropdownMenuItem>
						</Link>

						<DropdownMenuItem
							onClick={()=>handleDelete(productId)}
							className="text-red-500"
						>
							<TrashIcon className="text-red-500 hover:text-red-500" />
							<span className="text-sm font-manrope font-semibold hover:text-red-500">
								Delete Product
							</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
