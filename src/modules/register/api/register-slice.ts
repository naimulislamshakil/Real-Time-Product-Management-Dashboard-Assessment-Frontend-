import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
	endpoints: (builder) => ({
		registerUser: builder.mutation<
			{ message: string },
			{ fullName: string; email: string; password: string }
		>({
			query: (userData) => ({
				url: '/register',
				method: 'POST',
				body: userData,
			}),
		}),
	}),
});

export const { useRegisterUserMutation } = registerSlice;
