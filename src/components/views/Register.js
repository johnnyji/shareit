import React, {
  Component,
  PropTypes,
  View
} from 'react-native';
import AuthActionCreators from '../../actions/AuthActionCreators';
import {fullWidth} from '../../styles/baseStyles';
import {connect} from 'react-redux';
import Button from '../ui/Button';
import Input from '../ui/Input';
import {primaryLighter} from '../../styles/ColorScheme';
// import config from '../../../config/dev';
// import {getParameterByName} from '../../utils/http';
// import {instagram} from '../../../config';
// import {loginWithInstagram} from '../../actions/AuthActionCreators';
// import {setAlert} from '../../actions/AppActionCreators';

@connect((state) => ({
  authenticating: state.auth.get('authenticating'),
  email: state.auth.getIn(['form', 'email', 'value']),
  emailError: state.auth.getIn(['form', 'email', 'error']),
  password: state.auth.getIn(['form', 'password', 'value']),
  passwordError: state.auth.getIn(['form', 'password', 'error'])
}))
export default class Login extends Component {

  static displayName = 'Login';

  static propTypes = {
    authenticating: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    emailError: PropTypes.string,
    password: PropTypes.string.isRequired,
    passwordError: PropTypes.string
  };

  static contextTypes = {
    app: PropTypes.object.isRequired
  };

  render() {
    
    return (
      <View style={fullWidth}>
        <Input
          onUpdate={this._handleUpdateEmail}
          placeholder='Email'
          style={{backgroundColor: primaryLighter}}
          value={this.props.email} />
        <Input
          onUpdate={this._handleUpdatePassword}
          placeholder='Password'
          type='password'
          value={this.props.password} />
        <Button
          label='Login'
          onClick={this._handleRegister} />
      </View>
    );
  }

  /**
   * Handles clicking the login button and beginning
   * the authentication process
   */
  _handleRegister = () => {
  };
  
  _handleUpdateEmail = (value) => {
    this.props.dispatch(AuthActionCreators.updateEmail(value));
  };

  _handleUpdatePassword = (value) => {
    this.props.dispatch(AuthActionCreators.updatePassword(value));
  };

}
