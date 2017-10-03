# react-native-dial
![npm version](https://badge.fury.io/js/react-native-dial.svg)

<a href="https://getyeti.co" target="_blank">
   <img alt="works with yeti" src="works-with-yeti.png" width="100" />
</a>

> This package powers [Yeti Smart Home](https://getyeti.co) and is used in production.

A react native reusable and efficient dial knob element.

```javascript
import { Dial } from 'react-native-dial'
// ...
<Dial 
   initialRadius={brightness * DIF_RADIUS / 100 + MIN_RADIUS}
   radiusMax={MAX_RADIUS}
   radiusMin={MIN_RADIUS}
   onPress={() => this.toggle()}
   responderStyle={styles.responderStyle}
   wrapperStyle={styles.wheelWrapper}
   onValueChange={(a, r) => this.changeBrightness(r)} />
```

<img alt="demo screenshot" src="screenshot.png" width="350" />


Some properties:
```
<Dial
 fixed // disallows angle updates
 elastic // allows scaling the element
 initialAngle={Number}
 initialRadius={Number}
 radiusMax={Number}
 radiusMin={Number}
 responderStyle={ReactNative.Styles}
 wrapperStyle={ReactNative.Styles}
 >
 {/* 
   Optionally you can pass children so it renders a different component of your choice as a Dial,
   that can change in scale and angle
 */}
   <YourCustomDial />
 </Dial>
 
```

More documentation is incoming, in the meanwhile please read the source code. It is a single file!
PRs and issues are more than welcome.

Follow us in Github or https://twitter.com/netbeast_co.
