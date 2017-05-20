import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

export default class ImagePicker extends React.Component {
  state = {
    open: false,
  }

  res = null

  openDialog = () => {
    this.setState({open: true})
  }

  closeDialog = () => {
    this.setState({open: false})
  }

  onFileUploaded = (event) => {
    // console.log(event)
    console.log('file uploaded')
    var input = event.target

    var reader = new FileReader()
    reader.onload = () => {
        this.openDialog()
        var dataURL = reader.result

        var output = document.getElementById('output')
        output.src = dataURL

        this.res = $('#output').croppie({
          viewport: { width: 250, height: 250, type: 'circle' },
          boundary: {
              width: 300,
              height: 300
          }
        })
        window.dispatchEvent(new Event('resize'))

    }
    reader.readAsDataURL(input.files[0])
  }

  handleProfileImage = () => {
      this.res.croppie('result', 'base64').then(base64 => {
        let re = document.querySelector('.profile-image')
        re.style.width = '100px'
        re.src = base64
        re.onload = () => {
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          canvas.width = 200
          canvas.height = 200
          ctx.imageSmoothingEnabled = true
          ctx.drawImage(re, 0, 0, 200, 200)
          this.props.uploadImageToServer(canvas.toDataURL())
        }
        // this.props.uploadImageToServer(base64)
    })
    this.closeDialog()
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
        onTouchTap={this.closeDialog}
      />
    ]  

    return (
      <div>
        <div class="image-upload">
          <img class="profile-image" src={this.props.image} alt="profile-image" />
          <RaisedButton
              containerElement="label"
              label="new image"
          ><input class="file-input" type="file" accept="image/*" onChange={this.onFileUploaded}/></RaisedButton>
          
        </div>

        {/*<RaisedButton label="Dialog With Date Picker" onTouchTap={this.handleOpen} />*/}
        <Dialog
          title="Choose an image"
          autoDetectWindowHeight={true}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img id="output" src="" alt=""/>
        </Dialog>
      </div>
    )
  }
}