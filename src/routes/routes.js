import React from 'react';
import {BrowserRouter, Route, Routes } from'react-router-dom'
import JoinRoomContainer from '../containers/JoinRoomContainer';
import VideoCallContainer from '../containers/VideoCallContainer';


class RouteComponent extends React.Component {
    render() {
        return (
            <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={JoinRoomContainer} />
                <Route exacr path="/rooms/:roomId" Component={VideoCallContainer} />
            </Routes>
            </BrowserRouter>
        )
    }
}
export default RouteComponent;