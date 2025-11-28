'use client';
import { Button } from '@/components/ui/button';
import Modal from '../components/modal';
import { useEffect, useState } from 'react';
import { PlusCircleIcon } from 'lucide-react';
import {
	useDeleteProductMutation,
	useGetAllProductsQuery,
	useGetSingleProductByIdQuery,
} from '../../api/product-slice';
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const ProductViews = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [modalProductId, setModalProductId] = useState<string>('');
	const { data, error, refetch } = useGetAllProductsQuery();
	const [
		deleteProduct,
		{ isError, isLoading, isSuccess, error: deleteError, data: deleteData },
	] = useDeleteProductMutation();
	const { data: productData } = useGetSingleProductByIdQuery(modalProductId);

	useEffect(() => {
		if (isSuccess) {
			toast.success(deleteData?.message);
		}
	}, [error, deleteData, isError, isLoading, isSuccess]);

	const handleDelete = async (productId: string) => {
		await deleteProduct(productId).unwrap();
		refetch();
	};

	const handleEdit = (id: string) => {
		setModalProductId(id); // start fetch
	};

	useEffect(() => {
		if (productData?.success) {
			setOpen(true);
		}
	}, [productData]);

	return (
		<div className="w-full">
			<div className="flex items-center justify-between w-full">
				<h4 className="text-3xl font-manrope font-bold">Product Management</h4>

				<div>
					<Button
						onClick={() => setOpen(true)}
						className="rounded font-manrope font-semibold bg-blue-500 hover:bg-blue-600 text-white"
					>
						<PlusCircleIcon />
						Add New Product
					</Button>

					<Modal
						isOpen={open}
						setOpen={setOpen}
						onClose={() => setOpen(false)}
						product={productData?.product}
						id={modalProductId}
					></Modal>
				</div>
			</div>

			<DataTable
				columns={columns(handleDelete, handleEdit)}
				data={data?.products}
			/>
		</div>
	);
};
