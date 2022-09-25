import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rsvp } from '../types/rsvp.interface';

const initialState: Rsvp[] = [];

const rsvpSlice = createSlice({
    name: 'rsvp',
    initialState,
    reducers: {
        setRsvps: (state, action: PayloadAction<Rsvp[]>) => {
            return action.payload;
        },
        addRsvp: (state, action: PayloadAction<Rsvp>) => {
            state.push(action.payload);
        },
        updateRsvp: (state, action: PayloadAction<Rsvp>) => {
            const index = state.findIndex((rsvp) => rsvp.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteRsvp: (state, action: PayloadAction<string>) => {
            return state.filter((rsvp) => rsvp.id !== action.payload);
        }
    }
});