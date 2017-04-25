import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const ListExampleChat = () => (
    <div class="user-list">
        <List>
        <Subheader>Recent chats</Subheader>
        <ListItem
            primaryText="Brendan Lim"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Eric Hoffman"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Grace Ng"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Kerem Suer"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
            rightIcon={<CommunicationChatBubble />}
        />
        </List>
        <Divider />
        <List>
        <Subheader>Previous chats</Subheader>
        <ListItem
            primaryText="Chelsea Otakan"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
        />
        <ListItem
            primaryText="James Anderson"
            leftAvatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/${Math.round(Math.random()*100)}.jpg`} />}
        />
        </List>
    </div>
);

export default ListExampleChat;