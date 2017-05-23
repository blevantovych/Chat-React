import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Hamburger from 'material-ui/svg-icons/navigation/menu'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app'
import ProfileIcon from 'material-ui/svg-icons/action/account-circle'
import PrefsIcon from 'material-ui/svg-icons/action/settings'
import Notification from './Notification'

const Menu = (props) => (
    <IconMenu
        iconButtonElement={
            <IconButton><Hamburger color='white'/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Profile" rightIcon={<ProfileIcon />} onTouchTap={props.onProfileClick} />
        <MenuItem primaryText="Preferences" rightIcon={<PrefsIcon />} onTouchTap={props.onPrefsClick} />
        <MenuItem primaryText="Log out" rightIcon={<LogoutIcon />} onTouchTap={props.onLogoutClick} />
    </IconMenu>
)


class Header extends Component {

    render() {

        const menu = this.props.logged ?
            <div style={{minWidth: '150px', justifyContent: 'space-around', display: 'flex', alignItems: 'center'}}>
                {this.props.notification.who.length > 0
                ? <Notification notification={this.props.notification} writeBirthdayBoy={this.props.writeBirthdayBoy} /> 
                : null}
                <h4 style={{color: 'white', fontWeight: 'bold', fontSize: '1.2em', marginRight: '10px'}}>
                    {this.props.username}
                </h4>
                
                {this.props.userImage && <Avatar src={this.props.userImage} />}
                <Menu
                    onProfileClick={this.props.onProfileClick}
                    onLogoutClick={this.props.onLogoutClick}
                    onPrefsClick={this.props.onPrefsClick}
                />
            </div>
            : null
        return (
            <div class="header">
                <AppBar
                    title={this.props.title || 'CHAT'}
                    titleStyle={{cursor: 'pointer'}}
                    showMenuIconButton={false}
                    iconElementRight={menu}
                    onTitleTouchTap={this.props.onChatTextClick}
                />
            </div>
        )
    }
}

export default Header