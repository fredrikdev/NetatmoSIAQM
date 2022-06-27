/* 
NetatmoSIAQM for Scriptable (not affiliated with Netatmo in any way)
https://github.com/fredrikdev/NetatmoSIAQM

Scriptable Widget for the Netatmo Smart Indoor Air Quality Monitor (usually interfaced with by the iOS app Netatmo Home Coach) using the Netatmo Aircare API.

1) Create a new script in the iOS Scriptable app, add a name, color, glyph, and paste this script.
2) Login to your Netatmo Account at https://dev.netatmo.com/, and create a new app: https://dev.netatmo.com/apps/createanapp
3) Copy the fields Client Id and Client Secret (perhaps into iOS Notes), and construct & copy a string like this (use space/newline to separate fields):
client_id:6r782b9VBJJKksqp2c204070
client_secret:CoCNPDjo9XXXXXXYYYyEJWEwwzXXXXXN16d1
username:yournetatmoaccount@email.com
password:secretpassword
4) Paste the string in the params variable below.
5) On your home screen, add the new Scriptable Widget as a medium sized widget with the script.

Provided for free, MIT, as-is, by fredrikdev 2022. Inspired by https://github.com/olf/scriptable-netatmo-widget
*/

// parameters -- modify this & keep it private
let params = ``

function param(name) {
  return new RegExp(`${name}:([^\n\r\t ]+)`, "g").exec(params)[1]
}

// authenticate to get acces_token
let req1 = new Request("https://api.netatmo.net/oauth2/token")
req1.method = "POST"
req1.addParameterToMultipart("grant_type", "password")
req1.addParameterToMultipart("client_id", param("client_id"))
req1.addParameterToMultipart("client_secret", param("client_secret"))
req1.addParameterToMultipart("username", param("username"))
req1.addParameterToMultipart("password", param("password"))
req1.addParameterToMultipart("scope", "read_homecoach")
let res1 = await req1.loadJSON()
  
// request the data
let req2 = new Request(`https://api.netatmo.net/api/gethomecoachsdata?access_token=${encodeURI(res1.access_token)}`)
let res2 = await req2.loadJSON()
  
// store data into d and dd  
let d = res2.body.devices[0]
let dd = d.dashboard_data

// layout data on widget
function row(p) {
  let r = p.addStack()
  let vertical = 0
  for (let x = 1; x < arguments.length; x++) {
    let i = arguments[x]
    let c = r.addStack()
    for (let y = 0; y < i.length; y++) {
      let s = i[y]
      if (s.vertical) {
        c.layoutVertically()
        c.centerAlignContent()
        vertical = s.vertical
      } else {
        c.centerAlignContent()
      }
      let tc = c.addStack(), t1 = null, t2 = null
      tc.setPadding(s.padt || 0, 0, s.padb || 0, 0)
      t1 = tc.addText(s.t1)
      t1.textColor = Color.white()
      t1.font = s.f1|| Font.lightSystemFont(14)
      t1.lineLimit = 1
      if (s.t2) {
        t2 = tc.addText(s.t2)
        t2.textColor = Color.white()
        t2.font = s.f2 || Font.lightSystemFont(14)
        t2.lineLimit = 1
      }
      
      if (vertical) {
        if (y == i.length - 1) {
        } else {
          c.addSpacer(vertical == 99 ? null : vertical)
        }
      } else {
        if (y == i.length - 1) {
          if (t1) t1.rightAlignText()
          if (t2) t2.rightAlignText()
        } else {
          c.addSpacer()
        }
      }
    }  
    if (x != arguments.length - 1) {
       r.addSpacer()
    }
  }
  return r
}

let padding = 6*Device.screenScale()
let paddingLine = 1*Device.screenScale()
let w = new ListWidget()
w.setPadding(0, 0, 0, 0)
w.minimumScaleFactor = 0.6

let g = new LinearGradient()
g.colors = [new Color("64C5E8"),new Color("2F83B9")]
g.locations = [0,1.5]
w.backgroundGradient = g

let s = w.addStack()
s.layoutVertically()

// row 1
let f = new DateFormatter()
f.useMediumDateStyle()
f.useShortTimeStyle()

let fm16 = Font.mediumSystemFont(14)

let r1 = row(s, [ 
{ t1: `${d.station_name}`, f1: fm16 },
{ t1: `${f.string(new Date(dd.time_utc * 1000))}` } ]
)
r1.setPadding(padding, padding, 0, padding)
s.addSpacer()

// row 2
let fm40 = Font.mediumRoundedSystemFont(40)
let fl40 = Font.lightRoundedSystemFont(40)

let r2 = row(s, [
{ t1: `${dd.Temperature}`, f1: fm40, t2: `°`, f2: fl40 } ], [
{ t1: `⤒ ${dd.max_temp || dd.Temperature}°`, vertical: 2, padt: 6 },
{ t1: `⤓ ${dd.min_temp || dd.Temperature}°`, padb: 6 } ]
)
r2.setPadding(0, padding, 0, padding)
s.addSpacer()

// row 3
let r3 = row(s, [
{ t1: `HUMIDITY`, vertical: paddingLine },
{ t1: `${dd.Humidity}`, f1: fm16, t2: ` %`}
], [
{ t1: `CO₂`, vertical: paddingLine },
{ t1: `${dd.CO2}`, f1: fm16, t2: ` ppm`}
], [
{ t1: `NOISE`, vertical: paddingLine },
{ t1: `${dd.Noise}`, f1: fm16, t2: ` dB`}
], [
{ t1: `PRESSURE`, vertical: paddingLine },
{ t1: `${dd.AbsolutePressure}`, f1: fm16, t2: ` mbar` }
])
r3.setPadding(padding/2, padding, padding/2, padding)
r3.backgroundColor = g.colors[0]

// display
if (config.runsInApp) {
  w.presentMedium()
} else {  
  Script.setWidget(w)
}
Script.complete()
