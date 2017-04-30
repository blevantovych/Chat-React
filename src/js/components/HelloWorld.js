import React from 'react';
import { Card } from 'material-ui';

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    // In ES6 classes, class methods like handleKeyDown aren't automatically bound to "this"
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    // If the A key is pressed while CTRL or COMMAND are also being pressed
    if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
      // Don't perform the default action, which would select everything on page
      e.preventDefault();

      const win = window;
      const doc = win.document;
      // this.dialogBody is the div's DOM element captured in the ref={}
      const element = this.dialogBody;

      if (doc.body.createTextRange) {      // check if this is Internet Explorer
        // Select all text in "element", the IE way
        var range = doc.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (win.getSelection) {      // other browsers...
        // Select all text in "element", the standard way
        var selection = win.getSelection();
        var range = doc.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      }     
    }
  }

  componentDidMount() {
    // Element has been rendered, start capturing keyboard activity
    window.document.addEventListener('keydown', this.handleKeyDown);
  }

  componnetWillUnmount() {
    // Element is no longer been rendered, stop listening
    window.document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div>
        <p>
          Some text I don't want selected.
        </p>
        <p>
          More text I don't want selected.
        </p>
        <Card>
          <div ref={(ref) => (this.dialogBody = ref)}>
            <h1>Hello World!</h1>
            <p>Nice day, isn't it?</p>
          </div>
        </Card>
      </div>
    );
  }
}

export default HelloWorld;