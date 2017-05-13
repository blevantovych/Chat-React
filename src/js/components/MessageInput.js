import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';

class MessageInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TextField
                    name="message_input"
                    type="text"
                    ref="message"
                    style={{width: '400px'}}
                    onKeyPress={(e) => {
                        if (e.charCode == 13) {
                            this.props.onSendClick(this.refs.message.input.value)
                            this.refs.message.input.value = ""
                        }
                    }}
                />

                <RaisedButton
                    label="Send"
                    primary={true}
                    onClick={() => {
                        this.props.onSendClick(this.refs.message.input.value)
                        this.refs.message.input.value = ""
                    }}
                />
            </div>
        );
    }
}

export default MessageInput;