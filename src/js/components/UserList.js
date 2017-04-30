import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import { Card } from 'material-ui';
import TextField from 'material-ui/TextField';


class UserList extends Component {
    constructor(props) {
        super(props);

    }

     //primaryText={user.username}
                //leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*99)}.jpg`} />}
//                rightIcon={<CommunicationChatBubble />}
    
    render() {
        console.log(this.props);

        const userList = this.props.users.map(user => (
            <ListItem>
                <Card>
                    <div style={{padding: '20px'}}>{user}</div>
                </Card>
               
            </ListItem>
        ));

        return (
            <div class="user-list">
                <br />
                <TextField
                    hintText="Search..."
                    onChange={(e) => this.props.onInputChange(e.target.value)}
                />
                <List>
                    {userList}
                </List>
            </div>
        );
    }
}

export default UserList;