import React, { Component, PureComponent } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import Badge from 'material-ui/Badge';
import { Card } from 'material-ui';
import TextField from 'material-ui/TextField';

class UserList extends PureComponent {

    constructor(props) {
        super(props);
    }

    renderImage = (user) => {
        if (user.status == 'on')
            return <Badge
                badgeStyle={{top: 25, right: 25, backgroundColor: 'rgb(66, 183, 42)'}}>
                {user.fileContent ? <img style={{width: '100px'}} src={user.fileContent} alt=""/> : <img style={{width: '100px'}} src="http://www.sassijunior.com/wp-content/themes/junior/assets//img/placeholder.png" alt=""/>}   
            </Badge>
        else return <div>{user.fileContent ? <img style={{width: '100px'}} src={user.fileContent} alt=""/> : <img style={{width: '100px'}} src="http://www.sassijunior.com/wp-content/themes/junior/assets//img/placeholder.png" alt=""/>}</div>
    }

    render() {
        console.log('Userlist rerender');

        const userList = this.props.users.map(user => (
            <ListItem>
                <Card>
                    <div style={{padding: '20px', display: 'flex', alignItems: 'center'}}>
                        {this.renderImage(user)}
                        <h4>{user.username}</h4>
                        <h4>{user.status === 'on' ? 'online' : 'offline'}</h4>
                    </div>
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