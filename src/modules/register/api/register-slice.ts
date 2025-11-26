import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface RegisterRequest {
	fullName: string;
	email: string;
	password: string;
	phone: string;
}

export interface User {
	id: string;
	fullName: string;
	email: string;
	password: string;
	phone: string;
	createAt: number;
	role?: 'user' | 'admin';
}

export interface RegisterResponse {
	message: string;
	success: boolean;
}

interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	message: string;
	success: boolean;
	token: string;
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
		logInUser: builder.mutation<LoginResponse, LoginRequest>({
			query: (data) => ({
				url: '/api/v1/user/login',
				method: 'POST',
				credentials: 'include',
				body: data,
			}),
		}),
		getUser: builder.query<{ success: string; user: User }, void>({
			query: () => ({
				url: '/api/v1/user/me',
				method: 'GET',
				credentials: 'include',
			}),
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useLogInUserMutation,
	useGetUserQuery,
} = registerApi;
