import webrtcEvents from "./webrtcEvents";

class videoDevicesClass {
    getLocalStream = async (getLocalVideoStream) => {
        const localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        //action to update the state.
        getLocalVideoStream(localStream);
        //Add client's local tracks to peerConnection so that connected peers can see the local stream.
        webrtcEvents.addLocalTracksToPeerConnection(localStream);
    }

    addLocalStream = (localStream) => {
        const videoElement = document.getElementById("local_video");
        videoElement.srcObject = localStream;
    }

    // addRemoteStreams = (peerConnection, getRemoteVideoStream) => {
    //     peerConnection.addEventListener('track', (event) => {
    //         console.log('tacks', event.streams)
    //         getRemoteVideoStream(event.streams[0]);
    //         webrtcEvents.addRemoteTracksToPeerConnection(event.streams[0]);
    //     })
    // }
    handleReceiveRemoteVideoStream = (getRemoteVideoStream) => {
        console.log('handle receive')
        return (event) => {
            console.log(event.streams[0])
            getRemoteVideoStream(event.streams[0])
        }
    }
    displayRemoteStreams = (remoteStreams) => {
        const remoteStreamsContainer = document.getElementById('remote-streams');
        console.log(remoteStreams)
        remoteStreams.map((stream, index) => {
            const text = document.createElement('p');
            text.innerHTML = `remote_video-${index}`
            const element = document.createElement('video');
            element.id = `remote_video-${index}`;
            element.width = '200';
            element.height= '200';
            element.srcObject = stream;
            element.muted = false;
            element.autoplay = true;
            element.playsInline = true;
            remoteStreamsContainer.appendChild(text)
            remoteStreamsContainer.appendChild(element);
        });

    }
}
export default new videoDevicesClass();