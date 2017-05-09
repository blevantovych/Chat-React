import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export default class ImagePicker extends React.Component {
  state = {
    open: false,
  };

  res = null;

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  onFileUploaded = (event) => {
    // console.log(event);
    console.log('file uploaded');
    var input = event.target;

    var reader = new FileReader();
    reader.onload = () => {
        this.setState({open: true})
        var dataURL = reader.result;

        var output = document.getElementById('output');
        output.src = dataURL;

        this.res = $('#output').croppie({
          viewport: { width: 100, height: 100, type: 'circle' },
          boundary: {
              width: 300,
              height: 300
          }
        });

    };
    reader.readAsDataURL(input.files[0]);
  }

  handleProfileImage = () => {
      this.res.croppie('result', 'base64').then(base64 => {
        let re = document.querySelector('.profile-image')
        re.style.width = '100px'
        re.src = base64
        this.props.uploadImageToServer(base64)
    })
    this.setState({open: false})
  }

  render() {
    const actions = [
      <FlatButton
        id="btn-ok"
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleProfileImage}
      />,
      <FlatButton
        id="btn-cancel"
        label="Cancel"
        primary={true}
        onTouchTap={() => this.setState({open: false})}
      />
    ];  

    return (
      <div>
        <div class="image-upload">
          <img class="profile-image" src={this.props.image} alt="profile-image" />
          <RaisedButton
              containerElement="label"
              label="new image"
          ><input class="file-input" type="file" onChange={this.onFileUploaded}/></RaisedButton>
          
        </div>

        {/*<RaisedButton label="Dialog With Date Picker" onTouchTap={this.handleOpen} />*/}
        <Dialog
          title="Choose an image"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img id="output" src="" alt=""/>
        </Dialog>
      </div>
    );
  }
}