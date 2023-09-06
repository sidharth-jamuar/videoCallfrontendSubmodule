import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import JoinRoomContainer from './containers/JoinRoomContainer';
import { connect } from 'react-redux'
import {userSocketConnected} from './reducers/socketReducer'
import RouteComponent from './routes/routes';
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const socket = io('http://localhost:3004');
    this.props.userSocketConnected(socket);
  }

  componentDidUpdate() {

  }
  render() {
    const { socket } = this.props;
    if(Object.keys(socket).length < 1) {
      return(
        <div> Connecting...</div>
      
      )
    } else {
      return (
        <div>
          <RouteComponent />
        </div>
      )
    }
    }
}
const mapStateToProps = (state) => {
  return {
    socket: state.socket.data,
  }
}
const mapDispatchToProps =  {
  userSocketConnected
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
