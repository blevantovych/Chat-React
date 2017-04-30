import React, { Component } from 'react';
import { formWrapper, formStyles } from './formStyles';
import { TextField, RaisedButton } from 'material-ui';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: false,
            username: '',
            password: ''
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

                    <RaisedButton label="Sign up"
                        primary={true}
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.props.onSignupClick(this.state.username, this.state.password)}
                    />

                </div>
            </div>
        );
    }
}

export default Signup;