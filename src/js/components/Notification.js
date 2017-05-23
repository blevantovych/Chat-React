import React, { Component } from 'react'
import CakeIcon from 'material-ui/svg-icons/social/cake'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'

class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }
    
    handleTouchTap = (event) => {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        })
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        })
    }

    render() {
        let usersWithBday = this.props.notification.who.map(u => {
            const age = (new Date()).getYear() - (new Date(u.bday)).getYear()
            return <ListItem
                        key={u._id}
                        primaryText={<div>{u.username} turned <span class="age_birthday">{age}</span> today</div>}
                        leftAvatar={<Avatar src={u.fileContent} />}
                        onTouchTap={() => {
                            this.props.writeBirthdayBoy(u._id)
                            this.setState({open: false})
                        }}
                    >
                    </ListItem>
        })
        return (
            <div>
                <CakeIcon
                    style={{marginRight: '10px', color: 'white', cursor: 'pointer'}}
                    onTouchTap={this.handleTouchTap}
                >
                </CakeIcon>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                >
                    <List>
                        {usersWithBday}
                    </List>
                </Popover>
            </div>
        )
    }   
}

export default Notification