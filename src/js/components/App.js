import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Snackbar from 'material-ui/Snackbar'
import { TextField, RaisedButton } from 'material-ui'
import sortUsers from '../helpers/sortUsers'
import showNotification from '../helpers/showNotification'
import Header from './Header'
import './main.scss'
import './reset.scss'
import Chat from './Chat'
import Login from './Login'
import Signup from './Signup'
import Tabs from './Tabs'
import Profile from './Profile'
import Prefs from './Prefs'
import Loader from './Loader'
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
            allowSound: true,
            notificationsAllowed: false,
            messages: [],
            getMessagesOf: '',
            errorMessage: '',
            loaderActive: false,
            users: [],
            newMessages: {},
            logged: false,
            user: {
                username: '',
            },
            socket: null,
            view: 'login' // ['profile', 'login', 'chat', 'prefs']
        }
        this.audio = new Audio('play.mp3')
        console.log('APP constructor is invoked')
    }

    componentWillMount() {
        injectTapEventPlugin()
    }

    logout = () => {
        console.log('loggin out')
        this.setState({logged: false, view: 'login', newMessages: {}})
        this.state.socket.emit('leave', {username: this.state.user.username})
        this.state.socket.disconnect()
    }

    login = (username, password) => {
        this.setState({loaderActive: true, errorMessage: ''})
        console.log('loggind')
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
                localStorage.setItem('token', token)
                this.boom(token)
                Promise.all([this.getUsers(), this.getMessages()]).then((res) => {
                    let currentUser = res[0].filter(u => u.username === username)[0]
                    currentUser.status = 'on'
                    // generate newMessages 
                    let newMessages = res[1].filter(m => m.to === currentUser._id && m.time > currentUser.lastTimeOnline)
                    let newMessagesFromCtn = {}
                    newMessages.forEach((m) => {
                        newMessagesFromCtn[m.from] = newMessagesFromCtn[m.from] ? newMessagesFromCtn[m.from]+1 : 1
                    })
                    console.log(newMessages)
                    console.log(newMessagesFromCtn)
                    currentUser.lastTimeOnline
                    this.setState({
                        logged: true,
                        view: 'chat',
                        users: res[0],
                        messages: res[1].map(m => {
                            if (m.to === currentUser._id && m.time > currentUser.lastTimeOnline) {
                                m.unread = true
                            } 
                            m.time = (new Date(m.time)).toLocaleDateString()
                            return m
                        }),
                        user: currentUser,
                        loaderActive: false,
                        newMessages: newMessagesFromCtn
                    })
                })
            }).catch(e => {
                this.setState({errorMessage: 'There is no such user in db', loaderActive: false})
            }) 
    }

    onHeaderClick = () => {
        if (this.state.logged)
            this.setState({view: 'chat'})
    }

    signup = (username, email, password, initialImage) => {
        console.log(initialImage);
        let myHeaders = new Headers()
        myHeaders.set('Content-Type', 'application/json') 

        let myInit = {
            method: 'post',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify({ username, email, password, fileContent: initialImage })
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
    
    switchToPrefs = () => {
        console.log('switching to prefs');
        this.setState({view: 'prefs'})
    }

    makeLoaderActive = () => {
        this.setState({loaderActive: true})
    }

    sendMessage = (text) => {

        this.state.socket.emit('message', {
            text,
            from: this.state.user._id,
            to: this.state.getMessagesOf
        })
    } 

    boom (token) {
        const socket = io.connect(SOCKET_URL)

        
        this.setState({socket, errorMessage: ''})

        socket.on('connect', () => {
            console.log('connected')
            socket.emit('authenticate', { token })
        })

        socket.on('message', (mes) => {
            console.log('new message', mes);

            if (mes.to === this.state.user._id && this.state.allowSound) {
                this.audio.play()
            }

            if (mes.to === this.state.users_id) {
                 showNotification()
            }

            if (mes.to === this.state.user._id && mes.from !== this.state.getMessagesOf) {
                console.log('message should be marked as unread')
                mes.unread = true
            }

            if (mes.to === this.state.user._id || mes.from === this.state.user._id) {
                let messages = [...this.state.messages, mes]
                let newMessage = 
                    (mes.to === this.state.user._id && mes.from !== this.state.getMessagesOf) ? 
                        ({[mes.from]: (this.state.newMessages[mes.from]) ? this.state.newMessages[mes.from]+1 : 1}) : null
                this.setState({messages,  newMessages: Object.assign({}, this.state.newMessages, newMessage)})
            }

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
            Promise.all([this.getUsers(), this.getMessages()]).then((res) => {
                this.setState({
                    users: res[0],
                    messages: res[1]
                })
            })
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


    
    getMessagesOf = (user_id) => {
        let prevNewMessages = {...this.state.newMessages}
        delete prevNewMessages[user_id]
        this.setState({getMessagesOf: user_id, newMessages: prevNewMessages})
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

    usersWhoHaveBirthdayToday = () => {
        return this.state.users.filter(u => {
            if (u.bday) {
                const userBday = new Date(u.bday)
                const todaysDate = new Date()
                if ((userBday.getDate() === todaysDate.getDate()) && (userBday.getMonth() === todaysDate.getMonth())) {
                    return true
                }
            }
            return false;
        })
    }

    render() {

        let mainContent;
        switch (this.state.view) {
            case 'chat':
                mainContent = <Chat
                  onSendClick={this.sendMessage}
                  users={sortUsers(this.state.users, this.state.newMessages)}
                  getMessagesOf={this.getMessagesOf}
                  activeUser={this.state.getMessagesOf}
                  newMessages={this.state.newMessages}
                  currentUserId={this.state.user._id}
                  messages={this.state.messages.filter(m => {
                    return (m.to === this.state.getMessagesOf && m.from === this.state.user._id) ||
                        (m.to === this.state.user._id && m.from === this.state.getMessagesOf)
                    }).sort((m1, m2) => m1.time > m2.time)}
                 />
                break;

            case 'profile':
                mainContent = <Profile
                    user={this.state.user}
                    uploadImageToServer={this.uploadImageToServer}
                    updateUserInfo={this.updateUserInfo}
                   />
                break;

            case 'prefs':
                mainContent = <Prefs
                    checkedSound={this.state.allowSound}
                    onCheckSound={(val) => this.setState({allowSound: val})}
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
                        logged={this.state.logged}
                        userImage={this.state.user && this.state.user.fileContent}
                        username={this.state.user.username}
                        notification={{type: 'birthday', who: this.usersWhoHaveBirthdayToday()}}
                        onChatTextClick={this.onHeaderClick}
                        onProfileClick={this.switchToProfile}
                        onPrefsClick={this.switchToPrefs}
                        onLogoutClick={this.logout}
                    />
                    <Snackbar
                        open={!!this.state.errorMessage}
                        message={this.state.errorMessage}
                        autoHideDuration={4000}
                        bodyStyle={{backgroundColor: 'rgb(0, 188, 212)'}}
                    />
                    <Loader active={this.state.loaderActive} />
                    {mainContent}
                   
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App