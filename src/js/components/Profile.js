import React, { Component } from 'react'
import { TextField, RaisedButton, Card, CardText } from 'material-ui'

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
                        <CardText>
                            Lorem ipsum dolor sit amet, condsfkjlsdfjssectetur adipisicing elit. Temporibus, maiores.
                        </CardText>
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