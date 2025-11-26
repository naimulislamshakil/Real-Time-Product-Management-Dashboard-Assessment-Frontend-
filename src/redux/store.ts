import { configureStore } from '@reduxjs/toolkit';
import { registerSlice } from '@/modules/register/api/register-slice';

export const store = configureStore({
	reducer: {
		[registerSlice.reducerPath]: registerSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(registerSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
