import React, {
  Component,
  PropTypes,
  Text,
  View
} from 'react-native';
import AuthActionCreators from '../../../actions/AuthActionCreators';
import Button from '../../ui/Button';
import ColorScheme from '../../../styles/ColorScheme';
import CustomPropTypes from '../../utils/CustomPropTypes';
import Input from '../../ui/Input';
import StatusBarEscape from '../../ui/StatusBarEscape';
import Toolbar from '../../ui/Toolbar';
import baseStyles from '../../../styles/baseStyles';
import getResponseErrors from '../../../utils/http/getResponseErrors';
import pureRender from 'pure-render-decorator';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
// import config from '../../../config/dev';
// import {getParameterByName} from '../../utils/http';
// import {instagram} from '../../../config';
// import {loginWithInstagram} from '../../actions/AuthActionCreators';
// import {setAlert} from '../../actions/AppActionCreators';

@connect((state) => ({
  authenticating: state.auth.get('authenticating'),
  currentUser: state.app.get('currentUser'),
  email: state.auth.getIn(['form', 'email', 'value']),
  emailError: state.auth.getIn(['form', 'email', 'error']),
  password: state.auth.getIn(['form', 'password', 'value']),
  passwordError: state.auth.getIn(['form', 'password', 'error'])
}))
@pureRender
export default class Register extends Component {

  static displayName = 'Register';

  static propTypes = {
    authenticating: PropTypes.bool.isRequired,
    currentUser: CustomPropTypes.user,
    dispatch: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    emailError: PropTypes.string,
    password: PropTypes.string.isRequired,
    passwordError: PropTypes.string
  };

  static contextTypes = {
    app: PropTypes.object.isRequired
  };

  componentWillUpdate(nextProps) {
    if (!this.props.currentUser && nextProps.currentUser) {
      console.log('User is registered and now we take them to the Setup page.');
      Actions.Onboarding();
    }
  }

  render() {
    
    return (
      <View style={baseStyles.fullWidth}>
        <StatusBarEscape />

        <Toolbar onBackNavClick={Actions.pop}>
          <Text style={[baseStyles.subheader, baseStyles.centerText]}>Sign up</Text>
        </Toolbar>

        <View style={[baseStyles.stretchCrossAxis, {flex: 8}]}>
          <Input
            height={60}
            onUpdate={this._handleUpdateEmail}
            placeholder='Email'
            value={this.props.email} />
          <Input
            height={60}
            onUpdate={this._handleUpdatePassword}
            placeholder='Password'
            type='password'
            value={this.props.password} />
        </View>

        <Button
          label='Sign up!'
          onClick={this._handleRegister}
          style={baseStyles.centerChildren} />

      </View>
    );
  }

  _handleAuthenticate = () => {
    const {email, password} = this.props;

    return this.context.app.authenticate({
      type: 'local',
      email: email.toLowerCase().trim(),
      password
    });
  };

  _handleRegister = () => {
    const {dispatch, email, password} = this.props;

    this.context.app
      .service('users')
      .create({
        email: email.toLowerCase().trim(),
        password
      })
      .then(this._handleAuthenticate)
      .then((response) => {
        dispatch(AuthActionCreators.authenticateSuccess(response));
      })
      .catch((err) => {
        const firstError = getResponseErrors(err)[0];
        dispatch(AuthActionCreators.authenticateError(firstError));
      });
  };

  _handleUpdateEmail = (value) => {
    this.props.dispatch(AuthActionCreators.updateEmail(value));
  };

  _handleUpdatePassword = (value) => {
    this.props.dispatch(AuthActionCreators.updatePassword(value));
  };

}
