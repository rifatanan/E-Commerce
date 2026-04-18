import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import cartReducer from './slices/cartSlice';
import loginReducer from './slices/loginSlice';
import registerReducer from './slices/registerSlice';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        cart: cartReducer,
        login: loginReducer,
        registration: registerReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;