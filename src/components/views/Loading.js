import React, {
  ActivityIndicatorIOS,
  Component,
  PropTypes
} from 'react-native';

export default class Loading extends Component {

  static displayName = 'Loading';
  
  render() {
    return (
      <ActivityIndicatorIOS
        animating={true}
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center'
        }} />
    );
  }

}

