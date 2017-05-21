import React, { Component } from 'react';
import Highlight  from 'react-highlight';

class Code extends Component {
    render() {
        return (
            <div>
                <Highlight className='javascript'>
                     {this.props.code.replace('#code\n', '')}
                </Highlight>
            </div>
        );
    }
}


export default Code;