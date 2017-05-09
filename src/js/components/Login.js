import React, { Component, PureComponent } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { formWrapper, formStyles } from './formStyles';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: '',
            buttonDisabled: false
        }
    }

    render() {
        return (
            <div style={formWrapper}>
                <div class="form" style={formStyles}>
                    <TextField
                        style={{width: '400px'}}
                        floatingLabelText="Username"
                        type="text"
                        defaultValue={this.state.username}
                        onChange={(e) => this.setState({username: e.target.value})}
                    />

                    <TextField
                        style={{width: '400px'}}
                        floatingLabelText="Password"
                        type="password"
                        defaultValue={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                    />

                    <RaisedButton label="Login"
                        primary={true}
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.props.onLoginClick(this.state.username, this.state.password)}
                    />
                </div>
            </div>
        );
    }
}

export default Login;