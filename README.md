### IOS Notes:




**I can't seem to open any URLs**
- iOS 9 made a change which requires all URL calls to be whitelisted in the app's `Info.plist`. Otherwise, Safari won't open the external URL. In the `ios/shareit/Info.plist`, add the following code:

```xml
  <key>LSApplicationQueriesSchemes</key>
  <array>
    <string>instagram</string>
  </array>
```

See: http://stackoverflow.com/questions/30987986/ios-9-not-opening-instagram-app-with-url-scheme




**Why are we on React Native v0.21.0? Why not update?**

- Versions of React Native past 0.21.0 breaks socket.io. A fix for this has already been merged into `Engine.io` and is just waiting on a patch release by the `socket.io` team. See here: https://github.com/socketio/engine.io-parser/pull/55




**Why is my `io.on('connect', handler)` not firing / Why does the socket keep disconnecting?**

- When initiating the `io(API_PATH, options)` function in `.src/containers/Root.js`, you must pass a string either declared as the first argument or declared at the top of the file. Trying to import the `apiPath` argument from another file (ie: config) will break the socket connection and `io.on('connect')` will never fire.

This will work because `API_PATH` is a string declared in the file:
```javascript
const API_PATH = 'http://localhost:3030';

class Root extends Component {
  constructor(props) {
    // ...
    const options = {transports: ['websocket'], forceNew: true};
    const socket = io(API_PATH, options);
    // ...
  }
}
```

However, this will break, even though `config.api.path` is the same string as before:
```javascript
import config from '../../config/dev';

class Root extends Component {
  constructor(props) {
    // ...
    const options = {transports: ['websocket'], forceNew: true};
    const socket = io(config.api.path, options);
    // ...
  }
}
```