import React, { Component } from 'react';
import Navigation from './Navigation.jsx';
import MessageBoard from './MessageBoard.jsx';
import '../styling/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      currentChannel: null,
      messages: {},
      newMessage: ''
    }
  }

  componentDidMount() {
    // get all channels from server
    fetch('/api/channels')
      .then(res => res.json())
      .then(data => {
        this.setState({ channels: data.channels })
      })
  }

  handleChange = (e) => {
    this.setState({ newMessage: e.target.value })
  }

  // when user uses the Navigation to change channels
  onChannelClick = (e, channel) => {
    fetch(`/api/messages/${channel}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ currentChannel: channel, messages: data.messages, newMessage: '' })
      })
  }

  handleSubmit = (e) => {
    console.log('handleSubmit')
    e.preventDefault();

    const url = `/api/${this.state.currentChannel}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: this.state.newMessage
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          newMessage: '',
          messages: [...this.state.messages, data.newMessage]
        })
      })
  }

  render() {
    return (
      <div className="App">
        <Navigation channels={this.state.channels} onChannelClick={this.onChannelClick} />
        {/* Only showing Message board when a channel has been selected */}
        {this.state.currentChannel && <MessageBoard
          currentChannel={this.state.currentChannel}
          messages={this.state.messages}
          addNewMessage={this.addNewMessage}
          newMessage={this.state.newMessage}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />}
      </div>
    )
  }
}

export default App;
