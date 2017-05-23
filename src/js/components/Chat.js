import React, { Component, PureComponent } from 'react'
import { TextField, RaisedButton } from 'material-ui'
import UserList from './UserList'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

class Chat extends PureComponent {

  render() {
    const userImages = this.props.users.reduce((res, user) => {
      res[user._id] = user.fileContent
      return res
    }, {})
    return (
      <div style={{margin: 'auto', width: '80vw'}}>
        <div class="container-messagelist-userlist">
          <UserList
            lat={this.props.lat}
            lgn={this.props.lgn}
            users={this.props.users}
            onInputChange={this.props.onUserListInputChanged}
            getMessagesOf={this.props.getMessagesOf}
            newMessages={this.props.newMessages}
            activeUser={this.props.activeUser}
            getUserPos={this.props.getUserPos}
          />
          <div class="message-list-and-input">
            <MessageList
                messages={this.props.messages}
                usersImages={userImages}
                currentUserId={this.props.currentUserId}
            />
            <MessageInput onSendClick={this.props.onSendClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;