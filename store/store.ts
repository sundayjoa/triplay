import { configureStore } from '@reduxjs/toolkit';
import tourReducer from './slices/tourSlice'; 
import regionReducer from './slices/regionSlice';
import dateReducer from './slices/dateSlice';
import eventReducer from './slices/eventSlice'
import eventBoardReducer from './slices/eventboardSlice';
import eventdetailReducer from './slices/eventdetailSlice';

export const store = configureStore({
    reducer: {
        tour: tourReducer, 
        region: regionReducer,
        date: dateReducer,
        event: eventReducer,
        eventboard: eventBoardReducer,
        eventdetail: eventdetailReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
