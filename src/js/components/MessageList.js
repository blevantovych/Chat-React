import React, { Component, PureComponent } from 'react';
import { Card, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,`<a target="_blank" href='$1'>$1</a>`); 
}

class MessageList extends PureComponent {
    render() {
        console.log('MessageList rerenders');
        console.log(this.props);
        const messageList = this.props.messages.map(message => (
            <div style={this.props.currentUserId !== message.from ? {textAlign: 'right'}  : null}>
                <Card key={message.time}>
                    <CardText style={{padding: '10px'}}>
                        {/*<Avatar src={message.user.fileContent ? message.user.fileContent : "http://www.sassijunior.com/wp-content/themes/junior/assets//img/placeholder.png"} />*/}
                        <Avatar src={this.props.usersImages[message.from]} />
                        <h4 dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(message.msg) }}></h4>
                        <br/>
                        {(new Date(message.time)).toLocaleString()}
                        <br/>
                        {message.username}
                    </CardText>
                </Card>
            </div>
        ));
        return (
            <div class="message-list">
                {messageList}
            </div>
        );
    }
}

export default MessageList;