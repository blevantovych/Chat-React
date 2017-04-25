import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import UserList from './UserList';

import Header from './Header';
import MessageList from './MessageList';
import './main.scss';
import './reset.scss';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            users: []
        }
    }
    
    componentDidMount() {
        this.getUsers();
        this.getMessages();
    }
    

    componentWillMount() {
        injectTapEventPlugin();
    }
    
    getMessages = () => {
        fetch('http://eleksfrontendcamp-mockapitron.rhcloud.com/messages')
            .then(res => res.json())
            .then(res => this.setState({messages: res}))
    }

    getUsers = () => {
        fetch('http://eleksfrontendcamp-mockapitron.rhcloud.com/users')
            .then(res => res.json())
            .then(res => this.setState({users: res}))
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header />
                    <div class="container">
                        <UserList users={this.state.users} />
                        <MessageList messages={this.state.messages}/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;