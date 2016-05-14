import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import Root from './src/containers/Root';
import store from './src/store/index';

class App extends Component {
  
  static displayName = 'App';

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('shareit', () => App);
