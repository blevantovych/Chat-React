import React, { Component, PureComponent } from 'react'
import { Card, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import ReactDOM from 'react-dom'

function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.]*[-A-Z0-9+&@#\/%=~_|])/ig
    return text.replace(exp,`<a target="_blank" href='$1'>$1</a>`) 
}

function replaceNewLinesWithBr(text) {
    return text.replace(/\n/g, '<br/>')
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
        const messageList = this.props.messages.map(message => (
            <div style={u_id !== message.from ? {textAlign: 'right'}  : null}>
                <ListItem
                    style={{width: 'auto', cursor: 'default', backgroundColor: message.unread ? 'rgb(227, 255, 163)' : null}}
                    hoverColor={'transparent'}
                    key={message.time}
                    leftAvatar={u_id === message.from ? <Avatar src={this.props.usersImages[message.from]} /> : null}
                    rightAvatar={u_id !== message.from ? <Avatar src={this.props.usersImages[message.from]} /> : null}
                    primaryText={<h4 style={u_id !== message.from ? {marginRight: '10px'} : null} dangerouslySetInnerHTML={{ __html: replaceNewLinesWithBr(replaceURLWithHTMLLinks(message.msg)) }}></h4>}
                    secondaryText={<span style={u_id !== message.from ? {marginRight: '10px'} : null}>{(new Date(message.time)).toLocaleString()}</span>}
                >   
                </ListItem>
            </div>
        ))
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