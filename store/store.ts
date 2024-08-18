import { configureStore } from '@reduxjs/toolkit';
import tourReducer from './slices/tourSlice'; 
import regionReducer from './slices/regionSlice';
import dateReducer from './slices/dateSlice';

export const store = configureStore({
    reducer: {
        tour: tourReducer, 
        region: regionReducer,
        date: dateReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
