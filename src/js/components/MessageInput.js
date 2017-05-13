import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';

class MessageInput extends Component {
    render() {
        return (
            <div>
                <TextField
                    type="text"
                    defaultValue={this.messageText}
                    style={{width: '400px'}}
                    onChange={(e) => this.messageText = e.target.value}
                />

                <RaisedButton label="Send"
                    primary={true}
                    onClick={() => this.props.onSendClick(this.messageText)}
                />
            </div>
        );
    }
}

export default MessageInput;