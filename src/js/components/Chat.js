import React, { Component, PureComponent } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import UserList from './UserList'
import MessageList from './MessageList'


class Chat extends PureComponent {

  messageText = ""

  render() {
    const userImages = this.props.users.reduce((res, user) => {
      res[user.username] = user.fileContent
      return res
    }, {})
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
            users={this.props.users.sort((u1, u2) => u1.status === 'on' ? -1 : 1)}
          />

          <MessageList
              messages={[...this.props.messages].reverse()}
              usersImages={userImages}
          />
        </div>
      </div>
    );
  }
}

export default Chat;