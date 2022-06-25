# NetatmoSIAQM for Scriptable
*Not affiliated with Netatmo in any way*
https://github.com/fredrikdev/NetatmoSIAQM

**Scriptable Widget for the Netatmo Smart Indoor Air Quality Monitor (usually interfaced with by the iOS app Netatmo Home Coach) using the Netatmo Aircare API.**


## Screenshots

![Screenshot1](Screenshot1.JPG?raw=true)

![Screenshot2](Screenshot2.JPG?raw=true)

![Screenshot3](Screenshot3.JPG?raw=true)

## Setup

1) Create a new script in the iOS Scriptable app, add a name, icon, glyph, and paste this script.
2) Login to your Netatmo Account at https://dev.netatmo.com/, and create a new app: https://dev.netatmo.com/apps/createanapp
3) Copy the fields Client Id and Client Secret (perhaps into iOS Notes), and construct & copy a string like this (use space/newline to separate fields):
   
        client_id:6r782b9VBJJKksqp2c204070
        client_secret:CoCNPDjo9XXXXXXYYYyEJWEwwzXXXXXN16d1
        username:yournetatmoaccount@email.com
        password:secretpassword

4) Paste the string in the params variable below.
5) On your home screen, add the new Scriptable Widget as a medium sized widget with the script.

## Credits

Provided for free, MIT, as-is, by fredrikdev 2022. Inspired by https://github.com/olf/scriptable-netatmo-widget
