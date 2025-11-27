'use client';
import { Button } from '@/components/ui/button';
import Modal from '../components/modal';
import { useState } from 'react';
import { PlusCircleIcon } from 'lucide-react';
import { useGetAllProductsQuery } from '../../api/product-slice';

export const ProductViews = () => {
	const [open, setOpen] = useState(false);
	const { data, error } = useGetAllProductsQuery();

	console.log(data,error);
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
					></Modal>
				</div>
			</div>
		</div>
	);
};
