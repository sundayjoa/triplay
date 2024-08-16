import { configureStore } from '@reduxjs/toolkit';
import tourReducer from './slices/tourSlice'; 
import regionReducer from './slices/regionSlice';

export const store = configureStore({
    reducer: {
        tour: tourReducer, 
        region: regionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
