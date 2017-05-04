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
            file: {
                content: '',
                name: ''
            }
        }
    }
    encodeImageFileAsURL = (element) => {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            console.log(file);
            console.log(element);
            // document.getElementById('image').src = reader.result
            this.setState({file: {content: reader.result, name: file.name}})
        }
        reader.readAsDataURL(file);
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
                        floatingLabelText="Email"
                        type="email"
                        defaultValue={this.state.email}
                        onChange={(e) => this.setState({email: e.target.value})}
                    />

                    <TextField
                        style={{width: '400px'}}
                        floatingLabelText="Password"
                        type="password"
                        defaultValue={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                    />

                    <input
                        type="file"
                        ref={(node) => this.fileInput = node}
                        onChange={() => this.encodeImageFileAsURL(this.fileInput)}
                    />

                    <RaisedButton label="Sign up"
                        primary={true}
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.props.onSignupClick(this.state.username, this.state.email, this.state.password, this.state.file)}
                    />

                </div>
            </div>
        );
    }
}

export default Signup;