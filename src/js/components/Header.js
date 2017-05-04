import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Hamburger from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

const Menu = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton><Hamburger color={'white'}/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Logout" onTouchTap={props.onLogoutClick} />
        <MenuItem primaryText="Profile" onTouchTap={props.onProfileClick} />
    </IconMenu>
);


class Header extends Component {

    render() {

        const menu = this.props.logged ?
            // <FlatButton onTouchTap={this.props.onLogoutClick}  label="Logout" />
            <div>
                {this.props.userImage && <Avatar src={this.props.userImage} />}
                <Menu onProfileClick={this.props.onProfileClick} onLogoutClick={this.props.onLogoutClick} />
            </div>
            : null
        return (
            <div>
                <AppBar
                    title={this.props.title || 'CHAT'}
                    titleStyle={{cursor: 'pointer'}}
                    showMenuIconButton={false}
                    iconElementRight={menu}
                    onTitleTouchTap={this.props.onChatTextClick}
                />
            </div>
        );
    }
}

export default Header;