import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ListExampleChat from './UserList';

import Header from './Header';
import './main.scss';
import './reset.scss';

class App extends Component {
    
    componentWillMount() {
        injectTapEventPlugin();
    }
    
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header />
                    <ListExampleChat />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;