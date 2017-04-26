import React, { Component, PureComponent } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

class MessageList extends PureComponent {
    render() {
        console.log(this.props.messages);
        // console.log(this.props);
        const messageList = this.props.messages.filter(message => typeof message.msg === 'string').map(message => (
            <Card>
                <Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />
                <CardText>
                    {message.msg}
                </CardText>
            </Card>
        ));
        return (
            <div>
                {messageList}
            </div>
        );
    }
}

export default MessageList;