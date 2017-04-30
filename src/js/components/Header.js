import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Hamburger from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';

const Menu = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton><Hamburger color={'white'}/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Login" onTouchTap={() => console.log('Login')} />
        <MenuItem primaryText="Profile" onTouchTap={() => console.log('Profile')} />
    </IconMenu>
);


class Header extends Component {

    render() {

        const logoutButton = this.props.logged ?
            <FlatButton onTouchTap={this.props.onLogoutClick}  label="Logout" />
            : null
        return (
            <div>
                <AppBar
                    title={this.props.title || 'CHAT'}
                    showMenuIconButton={false}
                    iconElementRight={logoutButton}
                />
            </div>
        );
    }
}

export default Header;