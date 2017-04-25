import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Hamburger from 'material-ui/svg-icons/navigation/menu';

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
        return (
            <AppBar
                //style={{position: 'fixed', top: 0, width: '60vw'}}
                title={this.props.title || 'CHAT'}
                showMenuIconButton={false}
                iconElementRight={<Menu onMenuChange={this.props.onMenuChange || ( () => console.log('Menu Changed') )} />}
            />
        );
    }
}

export default Header
;