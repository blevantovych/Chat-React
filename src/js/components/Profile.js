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

    render() {
        return (
            <div class="profile-wrapper">
                {/*This is user profile*/}
                <div class="image-upload">
                    <ImagePicker uploadImageToServer={this.props.uploadImageToServer} image={this.props.image} />
                </div>
                <div class="user-info">
                    <Card>
                        
                        <div class="profile__item--change">
                            <h1>Username: </h1>
                            <TextField
                                type="text"
                                defaultValue={"Maria"}
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>

                        <div class="profile__item--change">
                            <h1>Email: </h1>
                            <TextField
                                type="text"
                                defaultValue={"levantovychmaria@gmail.com"}
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>

                        <div class="profile__item--change">
                            <h1>Birthdate: </h1>
                            <DatePicker hintText="Choose date" />
                        </div>

                        <RaisedButton label="Save"
                            primary={true}
                            onClick={() => console.log('saving')}
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