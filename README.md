# react-native-dial
A react native reusable and efficient dial knob element


Exmple of use:

```
<Dial 
   fixed // que no pueda girar
   initialRadius={brightness * DIF_RADIUS / 100 + MIN_RADIUS}
   radiusMax={MAX_RADIUS}
   radiusMin={MIN_RADIUS}
   onPress={() => this.toggle()}
   responderStyle={styles.responderStyle}
   wrapperStyle={styles.wheelWrapper}
   onValueChange={(a, r) => this.changeBrightness(r)} />
```
