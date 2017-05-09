import React, { Component, PureComponent } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import UserList from './UserList'
import MessageList from './MessageList'


class Chat extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      messageText: ''
    }
  }
  
  render() {
    return (
      <div style={{margin: 'auto'}}>
        <TextField
          type="text"
          defaultValue={this.state.messageText}
          onChange={(e) => this.setState({messageText: e.target.value})}
        />

         <RaisedButton label="Send"
          primary={true}
          onClick={() => this.props.onSendClick(this.state.messageText)}
        />

        <div class="container-messagelist-userlist">
          <UserList
            users={this.props.users}
          />

          <MessageList
              messages={[...this.props.messages].reverse()}
          />
          </div>
      </div>
    );
  }
}

export default Chat;