import { configureStore } from '@reduxjs/toolkit';
import { registerApi } from '@/modules/register/api/register-slice';
import { productApi } from '@/modules/dashboard/api/product-slice';

export const store = configureStore({
	reducer: {
		[registerApi.reducerPath]: registerApi.reducer,
		[productApi.reducerPath]: productApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(registerApi.middleware)
			.concat(productApi.middleware),
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
