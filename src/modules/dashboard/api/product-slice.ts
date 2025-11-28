import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface AddProductResponse {
	success: boolean;
	message: string;
}

interface AddProductRequest {
	productName: string;
	price: number;
	stock: number;
	category: string;
	status: string;
	description: string;
	image: string;
}

export interface Product {
	id: string;
	sku: string;
	createAt: any;
	updateAt?: any;
	productName: string;
	price: number;
	stock: number;
	category: string;
	status: string;
	description: string;
	image: string;
}

interface EditProductArgs {
	id: string;
	data: AddProductRequest;
}

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000',
	}),
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		addProduct: builder.mutation<AddProductResponse, AddProductRequest>({
			query: (productData) => ({
				url: '/api/v1/product/addProduct',
				method: 'POST',
				credentials: 'include',
				body: productData,
			}),
		}),
		getAllProducts: builder.query<
			{ success: boolean; message: string; products: Product[] },
			void
		>({
			query: () => ({
				url: '/api/v1/product/getAllProduct',
				method: 'GET',
				credentials: 'include',
			}),
			providesTags: (result) =>
				result
					? [
							...result.products.map(({ id }) => ({
								type: 'Products' as const,
								id,
							})),
							{ type: 'Products', id: 'LIST' },
					  ]
					: [{ type: 'Products', id: 'LIST' }],
		}),

		deleteProduct: builder.mutation({
			query: (id: string) => ({
				url: `/api/v1/product/deleteProduct/${id}`,
				method: 'DELETE',
				credentials: 'include',
			}),
			invalidatesTags: ['Products'],
		}),
		getSingleProductById: builder.query({
			query: (id: string) => ({
				url: `/api/v1/product/getProductById/${id}`,
				method: 'GET',
				credentials: 'include',
			}),
		}),

		editProduct: builder.mutation<AddProductResponse, EditProductArgs>({
			query: ({ id, data }: { id: string; data: AddProductRequest }) => ({
				url: `/api/v1/product/editProduct/${id}`,
				method: 'PUT',
				credentials: 'include',
				body: data,
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'Products', id },
				{ type: 'Products', id: 'LIST' },
			],
		}),
	}),
});

export const {
	useAddProductMutation,
	useGetAllProductsQuery,
	useDeleteProductMutation,
	useGetSingleProductByIdQuery,
	useEditProductMutation,
} = productApi;
