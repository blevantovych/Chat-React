import React, { Component, PureComponent } from 'react'
import { Card, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import ReactDOM from 'react-dom'

function replaceURLWithHTMLLinks(text, img) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.]*[-A-Z0-9+&@#\/%=~_|])/ig
    
    if (img) {
        return text.replace(exp,`<a target="_blank" href='$1'><div><h4>$1<h4><img class="image-in-message" src="${img}" height="100px" /></div></a>`) 
    }
    return text.replace(exp,`<a target="_blank" href='$1'>$1</a>`) 
}

function replaceNewLinesWithBr(text) {
    return text.replace(/\n/g, '<br/>')
    // return text
}

class MessageList extends PureComponent {
    constructor(props) {
        super(props)
    }

    scrollToBottom = () => {
        const node = ReactDOM.findDOMNode(this.messagesEnd)
        node.scrollIntoView({behavior: "smooth"})
    }

    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }
 
    render() {
        console.log('MessageList rerenders')
        console.log(this.props)

        let u_id = this.props.currentUserId
        const messageList = this.props.messages.map(message => {
            setTimeout(() => {
                message.unread = false;
            }, 2000);
            return (
            <div class={message.unread ? 'unread_message_highlight' : null} style={u_id !== message.from ? {textAlign: 'right'}  : null}>
                <ListItem
                    style={{width: 'auto', cursor: 'default'}}
                    hoverColor={'transparent'}
                    key={message.time}
                    leftAvatar={u_id === message.from ? <Avatar src={this.props.usersImages[message.from]} /> : null}
                    rightAvatar={u_id !== message.from ? <Avatar src={this.props.usersImages[message.from]} /> : null}
                    primaryText={<div
                        style={u_id !== message.from ? {marginRight: '10px'} : null}
                        dangerouslySetInnerHTML={{ __html: replaceNewLinesWithBr(replaceURLWithHTMLLinks(message.msg, message.image)) }}>
                    </div>
                    }
                    secondaryText={<span style={u_id !== message.from ? {marginRight: '10px'} : null}>{(new Date(message.time)).toLocaleString()}</span>}
                >   
                </ListItem>
            </div>
        )})
        return (
            <div class="message-list">
                <List>
                    {messageList}
                </List>
                <div
                    style={{float: 'left', clear: 'both'}}
                    ref={(el) => { this.messagesEnd = el; }}
                >
                </div>
            </div>
        )
    }
}

export default MessageList