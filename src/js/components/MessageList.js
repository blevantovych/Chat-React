import React, { Component, PureComponent } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

class MessageList extends PureComponent {
    render() {
        console.log(this.props.messages);
        // console.log(this.props);
        const messageList = this.props.messages.filter(message => typeof message.msg === 'string').map(message => (
            <Card>
                <Avatar src={message.user.fileContent ? message.user.fileContent : "http://www.sassijunior.com/wp-content/themes/junior/assets//img/placeholder.png"} />
                <CardText>
                    {message.msg}
                    <br/>
                    {(new Date(message.time)).toLocaleString()}
                    <br/>
                    {message.user.username}
                </CardText>
            </Card>
        ));
        return (
            <div class="message-list">
                {messageList}
            </div>
        );
    }
}

export default MessageList;