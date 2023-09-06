import { eventNames } from "../constants/eventNames";
import videoDevices from "./videoDevices";

class WebRtcEvents {
    peerConnection;

    createWebRtcPeerConnection = (getRemoteVideoStream) => {
        this.peerConnection = new RTCPeerConnection();
        this.peerConnection.ontrack = videoDevices.handleReceiveRemoteVideoStream(getRemoteVideoStream);
    }

    addLocalTracksToPeerConnection = (localStream) => {
        //Add localstream to peer connection so that other peers can see local video.
        localStream.getTracks().forEach(track => {
            this.peerConnection.addTrack(track, localStream);
        })
    }

    addRemoteTracksToPeerConnection = (remoteStream) => {

            remoteStream.getTracks().forEach(track => {
                const existingSender = this.peerConnection.getSenders().find((sender) => sender.track === track);
                if(!existingSender) {
                    this.peerConnection.addTrack(track, remoteStream);
                }
            })
    }

    createOfferToNewUser = async (socket, data) => {
        const clientOfferToNewUser = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(clientOfferToNewUser);
        socket.emit(eventNames.webrtcEvents.offerToNewUser, data, clientOfferToNewUser);
    }
    newUserGetsTheOffer = async (socket) => {
        //Newly joined user gets the offer from connected clients one by one.
        socket.on(eventNames.webrtcEvents.newUserGetsOffer, async (data, clientOfferToNewUser) => {
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(clientOfferToNewUser));
            this.newUserSendsAnswerToOfferingClient(socket, data);
        })
    }

    newUserSendsAnswerToOfferingClient = async (socket, data) => {
        const newUserAnswerToOfferingClient = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(newUserAnswerToOfferingClient);
        socket.emit(eventNames.webrtcEvents.newUserSendsAnswer, data, newUserAnswerToOfferingClient);
    }

    clientReceivesAnswerFromNewUser = async (socket) => {
        socket.on(eventNames.webrtcEvents.offerSenderReceivesAnswer, (data, newUserAnswerToOfferingClient) => {
            console.log(data);
            console.log(newUserAnswerToOfferingClient)
            this.peerConnection.setRemoteDescription(new RTCSessionDescription(newUserAnswerToOfferingClient));
        })
    }
}

export default new WebRtcEvents();