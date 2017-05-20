import React, { Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'

function simulateKeyPress(character) {
  jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
}

class MessageInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msgText: ''
        }
    }

    componentDidMount() {
        let ta = document.querySelector('textarea[name=message_input]')
        ta.addEventListener('keydown', (e) => {
        	 if (e.keyCode == 13 && !e.shiftKey) {
                this.props.onSendClick(this.state.msgText)
                this.setState({msgText: ''})
                e.preventDefault()
            } 
        })
    }
    
    render() {
        return (
            <div class="message-input">
                <TextField
                    name="message_input"
                    type="text"
                    placeholder="Type your message"
                    value={this.state.msgText}
                    multiLine={true}
                    onChange={(e) => this.setState({msgText: e.target.value})}
                    style={{padding: '5px', width: 'calc(100% - 20px)'}}
                />

                {/*<RaisedButton
                    label="Send"
                    primary={true}
                    onClick={() => {
                        this.props.onSendClick(this.refs.message.input.value)
                        this.refs.message.input.value = ""
                    }}
                />*/}
            </div>
        )
    }
}

export default MessageInput