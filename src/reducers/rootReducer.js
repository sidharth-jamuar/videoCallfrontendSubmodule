import { combineReducers } from '@reduxjs/toolkit';
import socketReducer from './socketReducer';
import streamReducer from './streamReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    socket: socketReducer,
    streams: streamReducer,
    userInfo: userReducer,
});

export default rootReducer;