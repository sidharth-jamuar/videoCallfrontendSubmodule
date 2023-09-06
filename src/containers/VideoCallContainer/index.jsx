import React, { Component } from 'react';
import { connect } from 'react-redux';
import videoDevices from '../../classes/videoDevices';
import roomEvents from '../../classes/roomEvents';
class VideoCallContainer extends Component {
    async componentDidMount() {
        const { streams, socket } = this.props;
        if(streams.localStreams !== null) {
            videoDevices.addLocalStream(streams.localStreams);
        }
    }

    componentDidUpdate(prevProps) {
        const { streams, socket } = this.props;
        if(streams.localStreams !== null) {
            videoDevices.addLocalStream(streams.localStreams);
        }
        if(streams.remoteStreams.length > 0 && streams.remoteStreams?.length !== prevProps.remoteStreams?.length) {
            videoDevices.displayRemoteStreams(streams.remoteStreams)
        }
    }
    render() {
        console.log(this.props.streams)
        return(
            <div>
                <video id="local_video" autoPlay muted width={800} height={800}></video>
                <div id ="remote-streams"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo.data,
        socket: state.socket.data,
        streams: state.streams.data,
    }
}
export default connect(mapStateToProps)(VideoCallContainer);