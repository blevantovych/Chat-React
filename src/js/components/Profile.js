import React, { Component } from 'react'
import { TextField, RaisedButton, Card, CardText } from 'material-ui'
import DatePicker from 'material-ui/DatePicker';

// import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import ImagePicker from './ImagePicker'
import './profile.scss'

class Profile extends Component {

    constructor(props) {
        super(props);
    }
    username = this.props.user.username
    email = this.props.user.email
    bday = this.props.user.bday
    render() {
        return (
            <div class="profile-wrapper">
                {/*This is user profile*/}
                <div class="image-upload">
                    <ImagePicker uploadImageToServer={this.props.uploadImageToServer} image={this.props.user.fileContent} />
                </div>
                <div class="user-info">
                    <Card>
                        
                        <div class="profile__item--change">
                            <h1>Username: </h1>
                            <TextField
                                type="text"
                                defaultValue={this.username}
                                onChange={(e) => this.username = e.target.value}
                            />
                        </div>

                        <div class="profile__item--change">
                            <h1>Email: </h1>
                            <TextField
                                type="text"
                                defaultValue={this.email}
                                onChange={(e) => this.email = e.target.value}
                            />
                        </div>

                        <div class="profile__item--change">
                            <h1>Birthdate: </h1>
                            <DatePicker
                                hintText="Choose date"
                                defaultDate={this.bday ? new Date(this.bday) : undefined}
                                onChange={(_, date) => this.bday = date.valueOf()}
                            />
                        </div>

                        <RaisedButton label="Save"
                            primary={true}
                            onClick={() => this.props.updateUserInfo(this.username, this.bday, this.email)}
                        />
                    </Card>
                </div>
                {/*<ImagePicker />*/}
                {/*<img id="output" src="" alt=""/>*/}
                {/*<button id="btn">ok</button>*/}
            </div>
        );
    }
}

export default Profile