import webrtcEvents from "./webrtcEvents";
const { eventNames } = require("../constants/eventNames")

class roomEvents {
    constructor() {

    }
    emitUserJoinedRoomEvent = (socket, data, updateUserInfo) => {
        console.log('Emit JoinRoom Event');
        socket.emit(eventNames.roomEvents.joinRoomEvent, data);
        //Update information provided by user to redux state.
        updateUserInfo({userName:data.userName, roomName: data.roomName});
    }

    onNewUserJoinedEvent = (socket) => {
        console.log('catch user joined room event')
        socket.on(eventNames.roomEvents.userJoinedRoomEvent, (data) => {
            console.log('data',data);
            //Create offer to the newly joined user from the client.
            webrtcEvents.createOfferToNewUser(socket, data);
        })
    }
}

export default new roomEvents();