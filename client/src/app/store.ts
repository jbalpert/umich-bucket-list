import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../features/event-slice';
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        event: eventReducer,
    },
    middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;