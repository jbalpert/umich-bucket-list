import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../types/event.interface';

const initialState: Event[] = [];

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<Event[]>) => {
            return action.payload;
        },
        addEvent: (state, action: PayloadAction<Event>) => {
            state.push(action.payload);
        },
        updateEvent: (state, action: PayloadAction<Event>) => {
            const index = state.findIndex((event) => event.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteEvent: (state, action: PayloadAction<number>) => {
            return state.filter((event) => event.id !== action.payload);
        },
    }
});

export const { setEvents, addEvent, updateEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;