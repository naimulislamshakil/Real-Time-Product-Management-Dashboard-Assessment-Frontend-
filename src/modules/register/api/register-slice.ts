import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface RegisterRequest {
	fullName: string;
	email: string;
	password: string;
	phone: string;
}

export interface RegisterResponse {
	message: string;
	success: boolean;
}

export const registerApi = createApi({
	reducerPath: 'registerApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000',
	}),
	endpoints: (builder) => ({
		registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
			query: (userData) => ({
				url: '/api/v1/user/register',
				method: 'POST',
				credentials: 'include',
				body: userData,
			}),
		}),
	}),
});

export const { useRegisterUserMutation } = registerApi;
