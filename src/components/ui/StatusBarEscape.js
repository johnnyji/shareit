import React, {Component, PropTypes} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomPropTypes from '../utils/CustomPropTypes';
import pureRender from 'pure-render-decorator';

const styles = StyleSheet.create({
  main: {
    height: 20
  }
});

@pureRender
export default class StatusBarEscape extends Component {
  
  static displayName = 'StatusBarEscape';

  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    style: CustomPropTypes.style
  };

  static defaultProps = {
    backgroundColor: 'transparent'
  };

  render() {
    const {backgroundColor, style} = this.props;

    return (
      <View style={[
        styles.main,
        {backgroundColor},
        style && style
      ]} />
    );
  }
}

