import { configureStore } from '@reduxjs/toolkit';
import { registerApi } from '@/modules/register/api/register-slice';

export const store = configureStore({
	reducer: {
		[registerApi.reducerPath]: registerApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(registerApi.middleware),
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
