import React, { Component } from 'react';
import JoinRoomComponent from '../../component/JoinRoomComponent';
import roomEvents from '../../classes/roomEvents';
import { updateUserInfo } from '../../reducers/userReducer';
import { connect } from 'react-redux';
import withNavigation from '../../HookWrappers/NavigateComponent';
import videoDevices from '../../classes/videoDevices';
import { getLocalVideoStream, getRemoteVideoStream } from '../../reducers/streamReducer';
import webrtcEvents from '../../classes/webrtcEvents';
class JoinRoomContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            roomName: '',
        }
    }

    componentDidMount() {
        const { socket } = this.props;
        //New user gets the offer from users already present in the room.
        webrtcEvents.newUserGetsTheOffer(socket);
        webrtcEvents.clientReceivesAnswerFromNewUser(socket);
        roomEvents.onNewUserJoinedEvent(socket);
    }
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    handleJoinRoom = (e) => {
        e.preventDefault();
        const { socket, updateUserInfo, navigate, getLocalVideoStream, getRemoteVideoStream } = this.props;
        const {userName, roomName} = this.state;
        //Emit userJoinedRoomEvent.
        navigate(`rooms/${roomName}`);
        roomEvents.emitUserJoinedRoomEvent(socket, {userName, roomName}, updateUserInfo);
        //create peer connection.
        webrtcEvents.createWebRtcPeerConnection(getRemoteVideoStream);
        videoDevices.getLocalStream(getLocalVideoStream);
    }
    render() {
        console.log(this.props);
        const { userName, roomName } = this.state;
        return (
            <div>
                <JoinRoomComponent 
                userName={userName}
                roomName={roomName}
                handleChange={this.handleChange}
                handleJoinRoom={this.handleJoinRoom}
                />
                {userName}
                {roomName}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        socket: state.socket.data
    }
}

const mapDispatchToProps = {
    updateUserInfo,
    getLocalVideoStream,
    getRemoteVideoStream
}
const wrappedComponent = withNavigation(JoinRoomContainer);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);