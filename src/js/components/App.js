import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import UserList from './UserList';

import Header from './Header';
import MessageList from './MessageList';
import './main.scss';
import './reset.scss';
import HelloWorld from './HelloWorld';

import Login from './Login'
import Signup from './Signup'
import Tabs from './Tabs'

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            filterUsersBy: '',
            users: [],
            logged: false,
            socket: null
        }
    }

    logout = () => {
        console.log('loggin out');
        this.setState({logged: false})
        this.state.socket.disconnect()
    }

    login = (username, password) => {
        console.log(`trying to login with
                      username: ${username}
                      password: ${password}`);
            
        let myHeaders = new Headers();
        myHeaders.set('Content-Type', 'application/json'); 

        let myInit = {
            method: 'post',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify({ username, password })
        }
        // const url = 'http://eleksfrontendcamp-mockapitron.rhcloud.com/login'
        const url = 'http://localhost:3000/login'
        fetch(url, myInit)
            .then(res => res.json())
            .then(({
                token
            }) => {
                console.log(token);
                this.boom(token);
                this.setState({logged: true})
            })
    }

    signup = () => {
        console.log('signing up');

    }

    boom (token) {
        const socket = io.connect('http://localhost:3000');
        this.setState({socket})

        socket.on('connect', () => {
            console.log('connected');
            socket.emit('authenticate', { token })
        })

        const log = console.log.bind(console);
        socket.on('message', log);

        socket.on('join',log);

        socket.on('leave',log);
        // setTimeout(() => {
            // socket.emit('message', 'good morning')
        // }, 1000);

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
            .then(res => this.setState({messages: res.filter(m => typeof m.msg === 'string')}))
    }

    getUsers = () => {
        fetch('http://eleksfrontendcamp-mockapitron.rhcloud.com/users')
            .then(res => res.json())
            .then(res => this.setState({users: res.filter(u => !!u.username)}))
    }

    changeUserListFilter (filterUsersBy) {
        console.log('changin userlist filter');
        this.setState({filterUsersBy})
    }

    render() {

        const mainContent = this.state.logged ?
                                <HelloWorld /> :
                                <Tabs onLoginClick={this.login} onSignupClick={this.signup} />
        return (
            <MuiThemeProvider>
                <div>
                    <Header logged={this.state.logged} onLogoutClick={this.logout} />
                    {mainContent}
                    {/*<HelloWorld />
                    <Header />
                    <div class="container">
                        <UserList users={this.state.users
                                            .filter(u => !!u.username)
                                            .filter(u => u.username.includes(this.state.filterUsersBy))
                                            .map(u => {
                                                const start = u.username.indexOf(this.state.filterUsersBy);
                                                const end = start + this.state.filterUsersBy.length;
                                                const subStringToHightLight = u.username.substring(start, end);
                                                return (<div>
                                                            {u.username.slice(0, start)}
                                                            <span class="highlight">{subStringToHightLight}</span>
                                                            {u.username.slice(end)}
                                                         </div>
                                                        )
                                            })}
                            onInputChange={this.changeUserListFilter.bind(this)}
                        />

                        <MessageList
                            messages={this.state.messages}
                        />
                    </div>*/}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;