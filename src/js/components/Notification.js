import React, { Component } from 'react';
import BellIcon from 'material-ui/svg-icons/social/notifications'

import Menu1 from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';

class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }
    
    handleTouchTap = (event) => {
    // This prevents ghost click.
        event.preventDefault();
        console.log('touchtap')
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
        let usersWithBday = this.props.notification.who.map(u =>{
            return <div>
                <h4>{u.username} has birthday</h4>
                <img
                    src={u.fileContent}
                    alt="birthday"
                    height="50px"
                />
            </div>
        })
        return (
            <div>
                <BellIcon
                    style={{marginRight: '10px', color: 'white', cursor: 'pointer'}}
                    onTouchTap={this.handleTouchTap}
                >
                </BellIcon>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                    >
         
                    <div>
                        {usersWithBday}
                    </div>
                </Popover>
            </div>
        )
    }   
}

export default Notification