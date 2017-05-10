import React, { Component, PureComponent } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

class MessageList extends PureComponent {
    render() {
        console.log('MessageList rerenders');
        const messageList = this.props.messages.map(message => (
            <Card>
                <CardText style={{padding: '10px'}}>
                    {/*<Avatar src={message.user.fileContent ? message.user.fileContent : "http://www.sassijunior.com/wp-content/themes/junior/assets//img/placeholder.png"} />*/}
                    <Avatar src={this.props.usersImages[message.username]} />
                    {message.msg}
                    <br/>
                    {(new Date(message.time)).toLocaleString()}
                    <br/>
                    {message.username}
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