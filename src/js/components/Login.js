import React, { Component, PureComponent } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { formWrapper, formStyles } from './formStyles';
import Errors from './Errors'

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
            <div style={formWrapper}>
                <div class="form" style={formStyles}>
                    <TextField
                        type="text"
                        style={{width: '400px'}}
                        hintText="username"
                        errorText={this.state.usernameErr && "This field is required."}
                        floatingLabelText="Username"
                        onChange={(e) => {
                            this.setState({
                                usernameErr: !e.target.value,
                                username: e.target.value,
                                usernameDirty: true
                            })
                        }}
                    />

                    <TextField
                        type="text"
                        style={{width: '400px', marginBottom: '20px'}}
                        hintText="password"
                        floatingLabelText="Password"
                        errorText={this.state.passwordErr && 'This field is required.'}
                        onChange={(e) => {
                            this.setState({
                                password: e.target.value,
                                passwordErr: !e.target.value,
                                passwordDirty: true
                            })
                        }}
                    />

                    <RaisedButton label="Login"
                        primary={true}
                        disabled={buttonDisabled}
                        onClick={() => this.props.onLoginClick(this.state.username, this.state.password)}
                    />
                </div>
            </div>
        );
    }
}

export default Login;