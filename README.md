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


** Why are we on React Native v0.21.0? Why not update?**

- Versions of React Native past 0.21.0 breaks socket.io. A fix for this has already been merged into `Engine.io` and is just waiting on a patch release by the `socket.io` team. See here: https://github.com/socketio/engine.io-parser/pull/55

