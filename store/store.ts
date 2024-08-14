import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';  // 임시 리듀서 임포트

export const store = configureStore({
    reducer: {
        counter: counterReducer,  // 스토어에 리듀서 추가
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
