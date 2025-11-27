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

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000',
	}),
	endpoints: (builder) => ({
		addProduct: builder.mutation<AddProductResponse, AddProductRequest>({
			query: (productData) => ({
				url: '/api/v1/product/addProduct',
				method: 'POST',
				credentials: 'include',
				body: productData,
			}),
		}),
	}),
});


export const {useAddProductMutation}=productApi
