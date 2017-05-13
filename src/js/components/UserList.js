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
        this.state = {
            filterValue: ''
        }
    }

    render() {
        let greenCircle = <div style={{
                width: '10px', height: '10px',
                backgroundColor: 'rgb(66, 183, 42)',
                position: 'relative',
                top: '25%',
                left: '25%', 
                borderRadius: '50%'
            }}></div>

        console.log('Userlist rerender');

        const userList = this.props.users.filter(u => u.username.includes(this.state.filterValue)).map(user => (
            <ListItem
                primaryText={user.username}
                leftAvatar={<Avatar src={user.fileContent} />}
                rightIcon={user.status == 'on' && <Avatar style={{backgroundColor: 'none'}}>{greenCircle}</Avatar>}
            >
            </ListItem>
        ));
        return (
            <div class="user-list">
                <br />
                <div style={{textAlign: 'center'}}>
                    <TextField
                        hintText="Search..."
                        style={{width: '50%'}}
                        onChange={(e) => this.setState({filterValue: e.target.value})}
                    />
                </div>
                <List>
                    {userList}
                </List>
            </div>
        );
    }
}

export default UserList;