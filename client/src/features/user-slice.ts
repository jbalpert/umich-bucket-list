import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user.interface';

const initialState: User[] = [];

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            return action.payload;
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.push(action.payload);
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            return state.filter((user) => user.id !== action.payload);
        }
    }
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
