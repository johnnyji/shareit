import React, {Component} from 'react-native';
import {Provider} from 'react-redux';
import Root from './components/Root';
import store from './store/index';

export default class App extends Component {
  
  static displayName = 'App';

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }

}
