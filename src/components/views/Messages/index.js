import React, {
  Component,
  ListView,
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
import MessagesContainer from './MessagesContainer';
import pureRender from 'pure-render-decorator';
import RequiresCurrentUser from '../../../containers/RequiresCurrentUser';
import RequiresNearbyMessages from '../../../containers/RequiresNearbyMessages';
import Toolbar from '../../ui/Toolbar';
import StatusBarEscape from '../../ui/StatusBarEscape';

const styles = StyleSheet.create({
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
@RequiresNearbyMessages
@pureRender
export default class Messages extends Component {

  static displayName = 'Messages';
  
  static contextTypes = {
    app: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired,
    dispatch: PropTypes.func.isRequired,
    loggingOut: PropTypes.bool.isRequired,
    loggedOut: PropTypes.bool.isRequired,
    logoutError: PropTypes.string,
    messagesListViewData: PropTypes.instanceOf(ListView.DataSource).isRequired
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
    const {
      currentUser,
      messagesListViewData
    } = this.props;

    return (
      <View>
        <StatusBarEscape />
        <Toolbar>
          <Clickable onClick={this._handleLogout} style={styles.logoutLink}>
            <Text>Logout</Text>
          </Clickable>
        </Toolbar>
        <MessagesContainer
          currentUser={currentUser}
          messagesListViewData={messagesListViewData} />
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
