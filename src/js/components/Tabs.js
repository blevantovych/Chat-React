import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Login from './Login'
import Signup from './Signup'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class TabsExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'b',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        style={{width: '400px', margin: 'auto', marginTop: '10px'}}
      >
        <Tab label="Sign up" value="a">
            <Signup onSignupClick={this.props.onSignupClick} />
        </Tab>
        <Tab label="Login" value="b">
            <Login onLoginClick={this.props.onLoginClick} />
        </Tab>
      </Tabs>
    );
  }
}