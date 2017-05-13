import React, { Component } from 'react';
import { formWrapper, formStyles } from './formStyles';
import { TextField, RaisedButton } from 'material-ui';


class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: false,
            username: '',
            password: '',
            email: '',
            usernameErr: false,
            passwordErr: false,
            emailErr: false,
            passwordDirty: false,
            usernameDirty: false,
            emailDirty: false
        }
    }

    render() {
        let buttonDisabled =
            (this.state.passwordErr || this.state.usernameErr || this.state.emailErr) ||
            (!this.state.passwordDirty || !this.state.usernameDirty || !this.state.emailDirty)
        return (
            <div style={formWrapper}>
                <div class="form" style={formStyles}>
                    <TextField
                        style={{width: '400px'}}
                        floatingLabelText="Username"
                        type="text"
                        errorText={this.state.usernameErr && "This field is required."}
                        defaultValue={this.state.username}
                        onChange={(e) => {
                            this.setState({
                                usernameErr: !e.target.value,
                                username: e.target.value,
                                usernameDirty: true
                            })
                        }}
                    />

                    <TextField
                        style={{width: '400px'}}
                        floatingLabelText="Email"
                        type="email"
                        errorText={this.state.emailErr && "This field is required."}
                        defaultValue={this.state.email}
                        onChange={(e) => {
                            this.setState({
                                emailErr: !e.target.value,
                                email: e.target.value,
                                emailDirty: true
                            })
                        }}
                    />

                    <TextField
                        style={{width: '400px'}}
                        floatingLabelText="Password"
                        type="password"
                        errorText={this.state.passwordErr && "This field is required."}
                        defaultValue={this.state.password}
                        onChange={(e) => {
                            this.setState({
                                passwordErr: !e.target.value,
                                password: e.target.value,
                                passwordDirty: true
                            })
                        }}
                    />

                    <RaisedButton label="Sign up"
                        primary={true}
                        disabled={buttonDisabled}
                        onClick={() => this.props.onSignupClick(this.state.username, this.state.email, this.state.password)}
                    />

                </div>
            </div>
        );
    }
}

export default Signup;