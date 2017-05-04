import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Header from './Header'

import './main.scss'
import './reset.scss'

import Chat from './Chat'

import Login from './Login'
import Signup from './Signup'
import Tabs from './Tabs'

import Profile from './Profile'

import { SIGNUP_URL, LOGIN_URL, SOCKET_URL, MESSAGES_URL, USERS_URL } from '../API_URLS'

class App extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            filterUsersBy: '',
            users: [],
            logged: false,
            socket: null,
            view: 'profile' // ['profile', 'login/signup', 'chat']
        }
    }

    logout = () => {
        console.log('loggin out')
        this.setState({logged: false, view: 'login'})
        this.state.socket.disconnect()
    }

    login = (username, password) => {
        console.log(`trying to login with
                      username: ${username}
                      password: ${password}`)
            
        let myHeaders = new Headers()
        myHeaders.set('Content-Type', 'application/json') 

        let myInit = {
            method: 'post',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify({ username, password })
        }
        
        fetch(LOGIN_URL, myInit)
            .then(res => res.json())
            .then(({
                token
            }) => {
                console.log(token)
                this.boom(token)
                this.setState({logged: true, view: 'chat'})
            })
    }

    onHeaderClick = () => {
        if (this.state.logged)
            this.setState({view: 'chat'})
    }

    signup = (username, email, password) => {
        console.log(`trying to sign up with
                      username: ${username}
                      password: ${password}
                      email: ${email}
                      `)
            
        let myHeaders = new Headers()
        myHeaders.set('Content-Type', 'application/json') 

        let myInit = {
            method: 'post',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify({ username, email, password })
        }
        fetch(SIGNUP_URL, myInit)
            .then(res => console.log(res))
            .then((res) => {
                this.login(username, password)
            })
    }

    switchToProfile = () => {
        this.setState({view: 'profile'})
    }

    sendMessage = (text) => {
        this.state.socket.emit('message', text)
        this.getMessages()
    } 

    boom (token) {
        const socket = io.connect(SOCKET_URL)
        this.setState({socket})

        socket.on('connect', () => {
            console.log('connected')
            socket.emit('authenticate', { token })
        })

        const log = console.log.bind(console)
        socket.on('message', () => {
            this.getMessages()
        })

        socket.on('join', (who) => {
            console.log(`${who.user.username} joined! ◕‿◕`);
        })

        socket.on('leave', (who) => {
            console.log(`${who.user.username} has leaved ◕︵◕ `);
        })

    }
    
    componentDidMount() {
        this.getUsers()
        this.getMessages()
    }
    
    componentWillMount() {
        injectTapEventPlugin()
    }
    
    getMessages = () => {
        fetch(MESSAGES_URL)
            .then(res => res.json())
            .then(res => this.setState({messages: res.filter(m => typeof m.msg === 'string')}))
    }

    getUsers = () => {
        fetch(USERS_URL)
            .then(res => res.json())
            .then(res => this.setState({users: res.filter(u => !!u.username)}))
    }

    changeUserListFilter (filterUsersBy) {
        console.log('changin userlist filter')
        this.setState({filterUsersBy})
    }

    render() {

        let mainContent;
        switch (this.state.view) {
            case 'chat':
                mainContent = <Chat
                  onSendClick={this.sendMessage}
                  users={this.state.users}
                  messages={this.state.messages}
                 />
                break;

            case 'profile':
                mainContent = <Profile />
                break;

            case 'login':
                mainContent = <Tabs onLoginClick={this.login} onSignupClick={this.signup} />
                break;

            default:
                break;
        }

        return (
            <MuiThemeProvider>
                <div>
                    <Header onChatTextClick={this.onHeaderClick} logged={this.state.logged} onLogoutClick={this.logout} onProfileClick={this.switchToProfile} />
                    {mainContent}
                   
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App