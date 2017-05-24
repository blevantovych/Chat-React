import React, { Component, PureComponent } from 'react'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import ReactDOM from 'react-dom'
import HighlightCode from './HighlightCode'

function replaceURLWithHTMLLinks(text, img) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.]*[-A-Z0-9+&@#\/%=~_|])/ig
    
    if (img) {
        return text.replace(exp,`<a target="_blank" href='$1'><div><h4>$1<h4><img class="image-in-message" src="${img}" height="100px" /></div></a>`) 
    }
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
        let u_id = this.props.currentUserId

        const messageList = this.props.messages.map(message => {
            setTimeout(() => {
                message.unread = false
            }, 2000)
            const codeMessage = message.msg.indexOf('#code\n') !== -1
            const messageText = codeMessage
                ? <div style={u_id === message.from ? {marginRight: '10px'} : null}>
                    <HighlightCode code={message.msg} />
                  </div> 
                : <div
                    style={u_id === message.from ? {marginRight: '10px'} : null}
                    class='message-text'
                    dangerouslySetInnerHTML={{
                        __html: replaceNewLinesWithBr(replaceURLWithHTMLLinks(message.msg, message.image))
                    }}>
            </div>

            return (
                <div
                    class={(message.unread ? 'unread_message_highlight' : '') + ' message'}
                    style={(u_id === message.from && !codeMessage) ? {textAlign: 'right'}  : null}
                >
                    <ListItem
                        style={{width: 'auto', cursor: 'default'}}
                        hoverColor={'transparent'}
                        key={message.time}
                        leftAvatar={u_id !== message.from
                            ? <Avatar src={this.props.usersImages[message.from]} />
                            : null
                        }

                        rightAvatar={u_id === message.from 
                            ? <div style={{marginLeft: '10px'}}>
                                <Avatar
                                    src={this.props.usersImages[message.from]}
                                /> 
                              </div>
                            : null
                        }

                        primaryText={messageText}
                        secondaryText={
                            <span
                                class="message-date"
                                style={u_id === message.from ? {marginRight: '10px'} : null}
                            >
                                {(new Date(message.time)).toLocaleString()}
                            </span>}
                    >   
                    </ListItem>
                </div>
            )
        })

        return (
            <div class="message-list">
                <List>
                    {messageList}
                </List>
                <div
                    style={{float: 'left', clear: 'both'}}
                    ref={(el) => { this.messagesEnd = el }}
                >
                </div>
            </div>
        )
    }
}

export default MessageList