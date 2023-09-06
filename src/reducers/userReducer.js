import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        data: {
            userName: '',
            connectedRoom: ''
        }
    },
    reducers: {
        updateUserInfo: (state, action) =>  {
            console.log('update user info',action.payload)
            state.data.userName = action.payload.userName;
            state.data.connectedRoom = action.payload.roomName;
            return state;
        }
    }
})
export const { updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
