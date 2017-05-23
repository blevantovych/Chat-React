import React, { Component } from 'react'
import Checkbox from 'material-ui/Checkbox'

const styles = {
  block: {
    maxWidth: 250,
    position: 'relative',
    top: '30px',
    margin: 'auto'
  },
  checkbox: {
    marginBottom: 16,
  },
}

class Prefs extends Component {
    render() {
        return (
            <div style={styles.block}>
                <Checkbox
                    label="Sound when new message"
                    style={styles.checkbox}
                    checked={this.props.checkedSound}
                    onCheck={(e, checked) => this.props.onCheckSound(checked)}
                />
            </div>
        )
    }
}

export default Prefs