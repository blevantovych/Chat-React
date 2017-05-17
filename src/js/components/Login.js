import React, { Component, PureComponent } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { formWrapper, formStyles } from './formStyles';

const Translations = {
    ua: {
        username: {
            hintText: "Ім'я користувача",
            floatingLabelText: "ім'я"
        },
        password: {
            hintText: "Пароль",
            floatingLabelText: "Пароль"
        },
        requiredField: "Це поле є обов'язковим",
        loginBtn: "Зареєструватися"
    },
    en: {
        username: {
            hintText: "Username",
            floatingLabelText: "username"
        },
        password: {
            hintText: "Password",
            floatingLabelText: "Password"
        },

        requiredField: "This field is required",
        loginBtn: "Login"
    }
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: '',
            usernameErr: false,
            passwordErr: false,
            passwordDirty: false,
            usernameDirty: false
        }
    }
        
    render() {
        let buttonDisabled =
            (this.state.passwordErr || this.state.usernameErr) ||
            (!this.state.passwordDirty || !this.state.usernameDirty)
        return (
            <div
                style={formWrapper}
                onKeyPress={(e) => {
                    if (e.charCode == 13) {
                        this.props.onLoginClick(this.state.username, this.state.password)
                    }
                }}
            >
                <div class="form" style={formStyles}>
                    <TextField
                        name="username"
                        type="text"
                        style={{width: '400px'}}
                        hintText={Translations[this.props.lang].username.hintText}
                        errorText={this.state.usernameErr && Translations[this.props.lang].requiredField}
                        floatingLabelText={Translations[this.props.lang].username.floatingLabelText}
                        onChange={(e) => {
                            this.setState({
                                usernameErr: !e.target.value,
                                username: e.target.value,
                                usernameDirty: true
                            })
                        }}
                    />

                    <TextField
                        name="password"
                        type="password"
                        style={{width: '400px', marginBottom: '20px'}}
                        hintText={Translations[this.props.lang].password.hintText}
                        floatingLabelText={Translations[this.props.lang].password.floatingLabelText}
                        errorText={this.state.passwordErr && Translations[this.props.lang].requiredField}
                        onChange={(e) => {
                            this.setState({
                                password: e.target.value,
                                passwordErr: !e.target.value,
                                passwordDirty: true
                            })
                        }}
                    />

                    <RaisedButton label={Translations[this.props.lang].loginBtn}
                        name="login_btn"
                        primary={true}
                        disabled={buttonDisabled}
                        onClick={() => {
                            this.props.onLoginClick(this.state.username, this.state.password)
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Login;