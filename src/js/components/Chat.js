import React, { Component, PureComponent } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import UserList from './UserList'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

class Chat extends PureComponent {

  render() {
    const userImages = this.props.users.reduce((res, user) => {
      res[user.username] = user.fileContent
      return res
    }, {})
    return (
      <div style={{margin: 'auto', width: '80vw'}}>
        <div class="container-messagelist-userlist">
          <UserList
            users={this.props.users.sort((u1, u2) => u1.status === 'on' ? -1 : 1)}
            onInputChange={this.props.onUserListInputChanged}
          />
          <div style={{display: 'flex', flexDirection: 'column', width: '65vw'}}>
            <MessageList
                messages={[...this.props.messages].reverse()}
                usersImages={userImages}
            />
            
            <MessageInput onSendClick={this.props.onSendClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;