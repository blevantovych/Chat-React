import React, { Component, PureComponent } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
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

        const userList = this.props.users.filter(u => u.username.match(new RegExp(this.state.filterValue, "gi"))).map((user, i) => (
            <div
                class="user"
                style={user._id === this.props.activeUser ? {backgroundColor: '#FF8DB4'} : null}
            >
                <ListItem
                    key={user._id}
                    hoverColor='none'
                    style={{height: '56px!important'}}
                    primaryText={<span
                        class="userlist--username"
                        dangerouslySetInnerHTML={{ __html: user.username.replace(new RegExp(this.state.filterValue, "gi"), `<mark>${this.state.filterValue}</mark>`) }}
                    >
                    </span>}
                    leftAvatar={<div class={user.status == 'on' ? 'online' : 'offline'}>
                        <Avatar src={user.fileContent} />
                        {(user._id in this.props.newMessages) ?
                            <span class="new-message-counter">{this.props.newMessages[user._id]}</span> : null}
                    </div>}
                    rightIcon={user.status == 'on' ? <Avatar style={{backgroundColor: 'none'}}>{greenCircle}</Avatar> : null}
                    onTouchTap={() => {
                        this.props.getMessagesOf(user._id)
                    }}
                >
                </ListItem>
            </div>
        ));
        return (
            <div class="user-list-and-search">
                <div style={{textAlign: 'center', background: 'white', zIndex: 2}}>
                    <TextField
                        name="search"
                        hintText="Search..."
                        style={{width: '50%'}}
                        onChange={(e) => this.setState({filterValue: e.target.value})}
                    />
                </div>
                <div class="user-list">
                    <List >
                        {userList}
                    </List>
                </div>
            </div>
        );
    }
}

export default UserList;