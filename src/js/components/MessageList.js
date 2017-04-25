import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

class MessageList extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <Card>
                    <Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, earum.
                    </CardText>
                </Card>
                <Card>
                    <Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, earum.
                    </CardText>
                </Card>
                <Card>
                    <Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, earum.
                    </CardText>
                </Card>
                <Card>
                    <Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, earum.
                    </CardText>
                </Card>
                <Card>
                    <CardText>
                        <Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, earum.
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default MessageList;