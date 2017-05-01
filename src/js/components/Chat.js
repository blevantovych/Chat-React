import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageText: ''
    }
  }
  
  render() {
    return (
      <div style={{margin: 'auto'}}>
        <TextField
          type="text"
          defaultValue={this.state.messageText}
          onChange={(e) => this.setState({messageText: e.target.value})}
        />
         <RaisedButton label="Send"
          primary={true}
          onClick={() => this.props.onSendClick(this.state.messageText)}
        />

      </div>
    );
  }
}

export default Chat;