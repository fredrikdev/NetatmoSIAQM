# NetatmoSIAQM for [Scriptable](https://scriptable.app/)
*Not affiliated with Netatmo in any way.*

https://github.com/fredrikdev/NetatmoSIAQM

**[Scriptable](https://scriptable.app/) Widget for the Netatmo Smart Indoor Air Quality Monitor (usually interfaced with by the iOS app Netatmo Home Coach) using the [Netatmo Aircare API](https://dev.netatmo.com/apidocumentation/aircare).**


## Screenshots

![Screenshot1](Screenshot1.JPG?raw=true)

![Screenshot2](Screenshot2.JPG?raw=true)

![Screenshot3](Screenshot3.JPG?raw=true)

## Setup


1) Login to your Netatmo Account at https://dev.netatmo.com/, and create a new app: https://dev.netatmo.com/apps/createanapp (yes, unfortunately you'll need to do this, but it's pretty swift)
2) Fill in the mandatory fields, save, and continue by setting the Redirect URI field to "https://noop". Save again, and take note of the Client Id (aaa) and Client Secret (bbb) fields.
3) Using your browser, construct and browse to the URL: https://api.netatmo.com/oauth2/authorize?client_id=aaa&scope=read_homecoach&redirect_uri=https://noop
4) ...After authenticating with Netatmo, you'll be redirected to a non-existing URL (e.g. https://noop/?code=ccc). Copy the value (ccc) from the &code= parameter.
6) Create a new script in the [iOS Scriptable app](https://scriptable.app/) add a name, color, glyph, and paste [this script](NetatmoSIAQM.js).
7) Edit the script below and set the 'params' variable with your own Client Id, Client Secret and value from the &code= parameter.
8) On your home screen, add the new Scriptable Widget as a (medium sized preferred) widget with the script.

## Credits

Provided for free, MIT, as-is, by fredrikdev 2022. Inspired by https://github.com/olf/scriptable-netatmo-widget
