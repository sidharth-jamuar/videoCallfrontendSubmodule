import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        data: {}
    },
    reducers: {
        userSocketConnected: (state, action) =>  {
            console.log(state.value)
            state.data = action.payload;
            return state;
        }
    }
})
export const { userSocketConnected } = socketSlice.actions;

export default socketSlice.reducer;
