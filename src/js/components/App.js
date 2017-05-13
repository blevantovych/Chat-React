import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { TextField, RaisedButton } from 'material-ui';
import Header from './Header'
import './main.scss'
import './reset.scss'
import Chat from './Chat'
import Login from './Login'
import Signup from './Signup'
import Tabs from './Tabs'
import Profile from './Profile'
import {
    SIGNUP_URL,
    LOGIN_URL,
    SOCKET_URL,
    MESSAGES_URL,
    USERS_URL,
    UPLOAD_IMAGE_URL,
    CHANGE_INFO_URL } from '../API_URLS'

class App extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            filterUsersBy: '',
            users: [],
            logged: false,
            user: {
                username: '',
            },
            socket: null,
            view: 'login' // ['profile', 'login', 'chat']

        }
    }

    logout = () => {
        console.log('loggin out')
        this.setState({logged: false, view: 'login'})
        this.state.socket.emit('leave', {username: this.state.user.username})
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
                // console.log(token)
                this.boom(token)
                Promise.all([this.getUsers(), this.getMessages()]).then((res) => {
                    this.setState({
                        logged: true,
                        view: 'chat',
                        users: res[0],
                        messages: res[1],
                        user: res[0].filter(u => u.username === username)[0]
                    })
                })
                
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
            .then(res => {
                this.login(username, password)
            })
    }

    switchToProfile = () => {
        this.setState({view: 'profile'})
    }

    sendMessage = (text) => {
        this.state.socket.emit('message', text)
    } 

    boom (token) {
        const socket = io.connect(SOCKET_URL)
        this.setState({socket})

        socket.on('connect', () => {
            console.log('connected')
            socket.emit('authenticate', { token })
        })

        socket.on('message', (mes) => {
            console.log('new message', mes);
            if (mes.username !== this.state.user.username) {
                let audio = new Audio('play.mp3');
                audio.play();
            }
            let messages = [...this.state.messages, mes]
            this.setState({messages})
        })

        socket.on('join', (who) => {

            if (!this.state.users.find(u => u.username === who.user.username)) {
                console.log(`I should see this image only if new user registers`);
                this.setState({users: [...this.state.users, who.user]})
            }

            let updatedUsers = this.state.users.map(u => {
                if (u.username === who.user.username) {
                    u.status = 'on'
                }
                return u;
            })
            
            console.log(`${who.user.username} joined! ◕‿◕`);
            this.setState({users: updatedUsers})
        })

        socket.on('leave', (who) => {
            console.log(who);
            let updatedUsers = this.state.users.map(u => {
                if (u.username === who.username) {
                    u.status = 'off'
                }
                return u;
            })
            console.log(`${who.username} has leaved ◕︵◕ `);
            this.setState({users: updatedUsers})
        })

        socket.on('imageChanged', (who) => {
            console.log(`${who.username} has changed his/her profile image`);
            let indexOfUser = this.state.users.findIndex(u => u.username === who.username)
            let updatedUsers  = [...this.state.users]
            updatedUsers.splice(indexOfUser, 1)

            let userWhoChangedImage = this.state.users.find(u => u.username === who.username)
            userWhoChangedImage.fileContent = who.image
            
            this.setState({users: updatedUsers.concat(userWhoChangedImage)})
        })

        socket.on('infoChanged', (who) => {
            console.log('some change their info');
            Promise.all([this.getUsers(), this.getMessages()]).then((res) => {
                console.log('after infochanged users\n',res[0]);
                // console.log('message\n',res[0]);
                this.setState({
                    users: res[0],
                    messages: res[1]
                })
            })
            // console.log(`${who.username} has changed his/her profile info`);
            // let indexOfUser = this.state.users.findIndex(u => u.username === who.username)
            // let updatedUsers  = [...this.state.users]
            // updatedUsers.splice(indexOfUser, 1)

            // let userWhoChangedInfo = this.state.users.find(u => u.username === who.username)

            // if (who.email) userWhoChangedImage.email = who.email
            // if (who.bday) userWhoChangedImage.email = who.bday
            // if (who.username) userWhoChangedImage.email = who.email

            
            // this.setState({users: updatedUsers.concat(userWhoChangedInfo)})
        })
    }
    
    uploadImageToServer = (base64) => {
        let myHeaders = new Headers()
        myHeaders.set('Content-Type', 'application/json') 

        let myInit = {
            method: 'post',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify({ username: this.state.user.username, fileContent: base64 })
        }
        this.setState({user: Object.assign({}, this.state.user, {fileContent: base64})})
        let cu = this.state.users.find(u => u.username === this.state.user.username)
        cu.fileContent = base64

        this.state.socket.emit('imageChanged', {
            username: this.state.user.username,
            image: base64
        })
        fetch(UPLOAD_IMAGE_URL, myInit)
            .then(res => res.json())
            .then(r => {
                console.log(r)
            })
    }

    updateUserInfo = (username, bday, email) => {
        let myHeaders = new Headers()
        myHeaders.set('Content-Type', 'application/json') 

        let myInit = {
            method: 'post',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify({
                username: this.state.user.username,
                updatedInfo: {
                    username,
                    bday,
                    email
                }
            })
        }

        this.setState({
            user: Object.assign({}, this.state.user, {
                username,
                bday,
                email
            })
        })
        
        fetch(CHANGE_INFO_URL, myInit)
            .then(res => res.json())
            .then(r => {
                this.state.socket.emit('infoChanged', {
                    username: this.state.user.username,
                    updatedInfo: {
                        username,
                        bday,
                        email
                    }
                })
            })
    }

    componentWillMount() {
        injectTapEventPlugin()
    }
    
    getMessages = () => {
        return fetch(MESSAGES_URL)
            .then(res => res.json())
            .then(res => res.filter(m => typeof m.msg === 'string'))
    }

    getUsers = () => {
        return fetch(USERS_URL)
            .then(res => res.json())
            .then(res => res.filter(u => !!u.username))
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
                mainContent = <Profile
                    user={this.state.user}
                    uploadImageToServer={this.uploadImageToServer}
                    updateUserInfo={this.updateUserInfo}
                   />
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
                    <Header
                        onChatTextClick={this.onHeaderClick}
                        logged={this.state.logged}
                        onLogoutClick={this.logout}
                        onProfileClick={this.switchToProfile}
                        userImage={this.state.user && this.state.user.fileContent}
                        username={this.state.user.username}
                    />
                    {mainContent}
                   
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App