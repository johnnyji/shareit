import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AppActionCreators from '../../../actions/AppActionCreators';
import AuthActionCreators from '../../../actions/AuthActionCreators';
import {connect} from 'react-redux';
import Clickable from '../../ui/Clickable';
import CustomPropTypes from '../../utils/CustomPropTypes';
import pureRender from 'pure-render-decorator';
import RequiresCurrentUser from '../../../containers/RequiresCurrentUser';
import Toolbar from '../../ui/Toolbar';
import StatusBarEscape from '../../ui/StatusBarEscape';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  logoutLink: {
    alignSelf: 'flex-end'
  }
});

@connect((state) => ({
  loggingOut: state.auth.get('loggingOut'),
  loggedOut: state.auth.get('loggedOut'),
  logoutError: state.auth.get('logoutError')
}))
@RequiresCurrentUser
@pureRender
export default class Home extends Component {

  static displayName = 'Home';
  
  static contextTypes = {
    app: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired,
    dispatch: PropTypes.func.isRequired,
    loggingOut: PropTypes.bool.isRequired,
    loggedOut: PropTypes.bool.isRequired,
    logoutError: PropTypes.string
  };

  componentWillReceiveProps(nextProps) {
    // If there was an error in the logout process
    if (!this.props.logoutError && nextProps.logoutError) {
      return this.props.dispatch(AppActionCreators.setAlert(nextProps.logoutError));
    }

    // If the logout was successful
    if (!this.props.loggedOut && nextProps.loggedOut) {
      Actions.Landing();
    }
  }

  render() {
    const {currentUser} = this.props;

    // Have an input field like: 'Hello __Your Name__'
    return (
      <View>
        <StatusBarEscape />
        <Toolbar>
          <Clickable onClick={this._handleLogout} style={styles.logoutLink}>
            <Text>Logout</Text>
          </Clickable>
        </Toolbar>

        <View style={styles.content}>
          <Text style={styles.mainText}>Hello {currentUser.get('email')}</Text>
        </View>
      </View>
    );
  }

  _handleLogout = () => {
    const {dispatch} = this.props;

    dispatch(AuthActionCreators.logout());

    this.context.app.logout()
      .then(() => {
        dispatch(AuthActionCreators.logoutSuccess());
      })
      .catch(({message}) => {
        dispatch(AuthActionCreators.logoutError(message));
      });
  };

}
