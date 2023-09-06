import { createSlice } from '@reduxjs/toolkit';

const streamSlice = createSlice({
    name: 'steams',
    initialState: {
        data: {
            localStreams: null,
            remoteStreams: []
        }
    },
    reducers: {
        getLocalVideoStream: (state, action) => {
            state.data.localStreams = action.payload;
            return;
        },
        getRemoteVideoStream:(state, action) => {
            console.log(action.payload)
            state.data.remoteStreams.push(action.payload);
            return
        }
    }
})
export const { getLocalVideoStream, getRemoteVideoStream } = streamSlice.actions;

export default streamSlice.reducer;
