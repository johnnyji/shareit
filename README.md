### IOS Notes:

**`#import "RCTSomeLibrary.h"` cannot be found`**

- In order to use iO

**I can't seem to open any URLs**
- iOS 9 made a change which requires all URL calls to be whitelisted in the app's `Info.plist`. Otherwise, Safari won't open the external URL. In the `ios/shareit/Info.plist`, add the following code:

```xml
  <key>LSApplicationQueriesSchemes</key>
  <array>
    <string>instagram</string>
  </array>
```

See: http://stackoverflow.com/questions/30987986/ios-9-not-opening-instagram-app-with-url-scheme