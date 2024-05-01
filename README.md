# User Data Collection

User Data Collection is a JavaScript class designed to collect various types of data from the user's browser environment. This class can be used to gather information such as geolocation, IP address, language preferences, device information, and more.

## Features

- **Geolocation**: Retrieves the user's current geographical location.
- **IP Address**: Fetches the user's IP address using an external API.
- **Language Information**: Provides the user's preferred language and list of preferred languages.
- **Operating System**: Identifies the user's operating system.
- **Referrer**: Determines the referring website URL.
- **Visit Time**: Records the time of the user's visit.
- **Screen Resolution**: Retrieves the user's screen resolution.
- **Cookies**: Checks whether cookies are enabled in the browser.
- **Request Information**: Gets the request method, path, and parameters.
- **User Agent**: Retrieves the user agent string.
- **Device Type**: Identifies whether the user is on a mobile or desktop device.
- **Battery Level**: Retrieves the battery level of the user's device (if available).
- **Device Memory**: Retrieves the amount of device memory available.
- **Timezone**: Identifies the user's timezone.
- **Online Status**: Determines whether the user is currently online or offline.

## Usage

1. Include the `UserDataCollector.js` file in your project.
2. Create an instance of the `UserDataCollector` class.
3. Access the collected user data using the `userData` property of the instance.

```javascript
import { UserDataCollector } from './UserDataCollector.js';

const userDataCollector = new UserDataCollector();
console.log(userDataCollector.userData);
