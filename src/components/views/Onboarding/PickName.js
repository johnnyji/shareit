import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import Clickable from '../../ui/Clickable';
import CustomPropTypes from '../../utils/CustomPropTypes';
import OnboardingActionCreators from '../../../actions/OnboardingActionCreators';
import Input from '../../ui/Input';

const styles = StyleSheet.create({
  main: {},
  nextStepLink: {}
});

@connect((state) => ({
  name: state.onboarding.getIn(['form', 'name', 'value']),
  nameError: state.onboarding.getIn(['form', 'name', 'error'])
}))
export default class PickName extends Component {
  
  static displayName = 'PickName';

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired,
    dispatch: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    nameError: PropTypes.string
  };

  render() {
    const {name, nameError} = this.props;
    const isValidName = name.length > 0 && !nameError;

    return (
      <View style={styles.main}>
        <Text>Hello,</Text>
        <Input
          height={100}
          onUpdate={this._handleUpdateName}
          placeholder="Your name"
          value={name} />
        {isValidName &&
          <Clickable
            onClick={this._handleNextStep}
            style={styles.nextStepLink}>
            <Text>Lets move on!</Text>
          </Clickable>
        }
      </View>
    );
  }

  _handleNextStep = () => {
  };

  _handleUpdateName = (name) => {
    this.props.dispatch(OnboardingActionCreators.updateName(name));
  };

}

