import React, { Component } from 'react';
import './index.css'
class JoinRoomComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userName, roomName, handleChange, handleJoinRoom } = this.props;
        return (
            <div className='join_room_component_container'>
                <input type='text'
                className='join_room_component_username_input'
                placeholder='Enter Your UserName'
                value={userName}
                onChange={e => handleChange('userName', e.target.value)}
                />
                <input type='text'
                className='join_room_component_roomName_input'
                placeholder='Enter RoomName'
                value={roomName}
                onChange={e => handleChange('roomName', e.target.value)}
                />
                <button className='join_room_component_join-button'
                onClick={e => handleJoinRoom(e)}
                >Join Room</button>
            </div>
        )
    }
}

export default JoinRoomComponent;