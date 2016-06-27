import {
  FETCH_MESSAGES_SUCCESS
} from '../action_types/MessagesActionTypes';
import {ListView} from 'react-native';
import createReducer from './utils/createReducer';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  messages: null,
  messagesListViewData: new ListView.DataSource({
    rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
  }),
  offset: 0
});

export default createReducer(initialState, {

  name: 'Messages',
  
  handlers: {
    onFetched: [FETCH_MESSAGES_SUCCESS]
  },

  onFetched(state, {messages, offset}) {
    // When we fetch new messages, we want to add them to
    // the existing messages
    let newState = state.update('messages', (m) => {
      if (m == null) return Immutable.fromJS(messages);
      return m.concat(Immutable.fromJS(messages));
    });

    // Update the messages offset fetch count
    newState = newState.set('offset', offset);

    // Updates the ListView rows with the new messages
    newState = newState.update('messagesListViewData', (data) => {
      // We must convert the list of messages into JS Arrays in
      // order to be properly rendered by ListView, but the actual rows
      // themselves can remain Immutable
      return data.cloneWithRows(newState.get('messages').toArray());
    });

    return newState;
  }

});
