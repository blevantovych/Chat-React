import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class UserList extends Component {
    render() {
        console.log(this.props);
        const userList = this.props.users.filter(user => !!user.username).map(user => (
            <ListItem
                primaryText={user.username}
                leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
                rightIcon={<CommunicationChatBubble />}
            />
        ));

        return (
            <div class="user-list">
                <List>
                    {userList}
                </List>
            </div>
        );
    }
}

export default UserList;