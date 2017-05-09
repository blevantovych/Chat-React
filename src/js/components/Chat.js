import React, { Component, PureComponent } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import UserList from './UserList'
import MessageList from './MessageList'


class Chat extends PureComponent {

  messageText = ""

  render() {
    return (
      <div style={{margin: 'auto'}}>
        <TextField
          type="text"
          defaultValue={this.messageText}
          onChange={(e) => this.messageText = e.target.value}
        />

         <RaisedButton label="Send"
          primary={true}
          onClick={() => this.props.onSendClick(this.messageText)}
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