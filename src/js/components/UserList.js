import React, { Component, PureComponent } from 'react'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import TextField from 'material-ui/TextField'
import LocationOnIcon from 'material-ui/svg-icons/communication/location-on'
import LocationOffIcon from 'material-ui/svg-icons/communication/location-off'

import { grey400 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

const setMap = (lat, lng, cb) => {
    if (lat && lng) {
        const mapProp = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 17
        }
        const map = new google.maps.Map(document.getElementById("googleMap"), mapProp)
        const marker = new google.maps.Marker({position: mapProp.center})
        marker.setMap(map)
        document.getElementById("mapCont").style.display = 'block'
    }
    document.getElementById('closemap-btn').addEventListener('click', () => {
        console.log('close btn clicked')
        document.getElementById("mapCont").style.display = 'none'
        cb()
    })
}

const iconButtonElement = (color) => (
  <IconButton
    touch={true}
  >
    <MoreVertIcon color={color} />
  </IconButton>
);

const rightIconMenu = (onClick, color, lastTimeOnline) => (
  <IconMenu
    iconButtonElement={iconButtonElement(color)}
  >
  {lastTimeOnline
    ?   <MenuItem>Last time online: {(new Date(lastTimeOnline)).toLocaleString()}</MenuItem>
    :   <MenuItem
            onTouchTap={onClick}
        >
            <span>
                <LocationOnIcon class="location_icon" />
            </span>
            Show on map
        </MenuItem> 
  }
    
  </IconMenu>
);

class UserList extends PureComponent {

    constructor(props) {
        super(props)
        console.log('Userlist constructor')

        this.state = {
            filterValue: '',
        }
    }

    render() {

        let greenCircle = <div class="online-badge"></div>
    
        console.log('Userlist rerender')

        const userList = this.props.users.filter(u => u.username.match(new RegExp(this.state.filterValue, "gi"))).map((user, i) => (
            <div
                class="user"
                style={user._id === this.props.activeUser ? {backgroundColor: '#FF8DB4'} : null}
            >
                <span class="tooltiptext">{user.username}</span>

                <ListItem
                    key={user._id}
                    hoverColor='none'
                    style={{height: '56px!important'}}
                    primaryText={<span
                        class="userlist--username"
                        dangerouslySetInnerHTML={{
                            __html: user.username.replace(
                                new RegExp(this.state.filterValue, "gi"),
                                `<mark>${this.state.filterValue}</mark>`)
                        }}
                    >
                    </span>}
                    leftAvatar={
                        <div class={user.status === 'on' ? 'online' : null}>
                            <Avatar src={user.fileContent} />
                            {(user._id in this.props.newMessages) 
                            ? <span class="new-message-counter">{
                                this.props.newMessages[user._id]}</span>
                            : null}
                            {user.status === 'on' ? greenCircle : null}
                        </div>
                    }
                    rightIconButton={rightIconMenu(() => {

                        this.props.getUserPos(user._id)
                        
                    }, user._id === this.props.activeUser ? 'white' : grey400,
                    user.status === 'on' ? null : user.lastTimeOnline)}

                    onTouchTap={() => {
                        this.props.getMessagesOf(user._id)
                    }}
                    
                >
                </ListItem>
            </div>
        ))
        const gpsDataAvailable = this.props.requestGPSuser in this.props.usersCoords
        let lat = null
        let lgn = null
        if (gpsDataAvailable) {
            lat = this.props.usersCoords[this.props.requestGPSuser].lat
            lgn = this.props.usersCoords[this.props.requestGPSuser].lgn
            setMap(lat, lgn, this.props.removeRequestGps)
        }
        return (
            <div class="user-list-and-search">
                
                <div style={{width: '200%', background: 'white', zIndex: 2}}>
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
        )
    }
}

export default UserList