import React, { Component } from 'react'
import {
  View, StyleSheet, Animated, PanResponder, Dimensions
 } from 'react-native'
import { throttle } from 'lodash'

export class Dial extends Component {
  constructor (props) {
    super(props)
    this.state = {
      angle: this.props.initialValue,
      radius: 1
    }
    this.updateState = throttle(this._updateState.bind(this), 16)
  }

  static defaultProps = {
    initialValue: 0,
    precision: 0
  }

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, g) => true,
      onMoveShouldSetPanResponderCapture: (e, g) => true,
      onPanResponderGrant: (e, gestureState) => true,
      onPanResponderMove: (e, gestureState) => this.updateAngle(gestureState),
      onPanResponderRelease: (e, gestureState) => {}
    })
  }

  updateAngle (gestureState) {
    let {deg, radius} = this.calcAngle(gestureState)
    if (deg < 0) deg = deg + 360
    if (Math.abs(this.state.angle - deg) > this.props.precision) {
      this.updateState({deg, radius})
    }
  }

  calcAngle ({pageX, pageY, moveX, moveY}) {
    const [x, y] = [pageX || moveX, pageY || moveY]
    const [dx, dy] = [x - this.offset.x, y - this.offset.y]
    return {
      deg: Math.atan2(dy, dx) * 180 / Math.PI + 120,
      radius: Math.sqrt(dy * dy + dx * dx) / this.radius // pitagoras r^2 = x^2 + y^2 normalizado
    }
  }

  _updateState ({deg, radius = this.state.radius}) {
    if (deg < 0) deg = deg + 360

    if (radius < this.props.radiusMin) radius = this.props.radiusMin
    else if (radius > this.props.radiusMax) radius = this.props.radiusMax

    this.setState({angle: deg + 10, radius}) // + 10 === Offset para ajustar el toque del dedo
    this.props.onValueChange(deg, radius)
  }

  // onLayout ({nativeEvent}) {
  //   console.log('bip')
  //   const {x, y, width, height} = nativeEvent.layout
  //   this.offset = {x: x + width / 2, y: y + height / 2}
  //   this.radius = width / 2
  //   console.log({onLayout: nativeEvent})
  // }

  componentDidMount () {
    setTimeout(() => {
      this.self.measureInWindow((x, y, width, height) => {
        this.offset = {x: x + width / 2, y: y + height / 2}
        this.radius = width / 2
      })
    })
  }

  render () {
    const rotate = this.state.angle + 'deg'
    const scale = this.props.elastic ? this.state.radius : 1

    console.log({rotate, scale})
    return (
      <View ref={(node) => { this.self = node}}
        // onLayout={(e) => this.onLayout(e)}
        style={[styles.coverResponder, this.props.responderStyle]}
        {...this._panResponder.panHandlers}
      >
        {this.props.children
          ? <Animated.View style={[this.props.wrapperStyle, {transform: [{rotate}, {scale}]}]}>
            {this.props.children}
          </Animated.View>
          : <DefaultDial style={this.props.style} rotate={rotate} scale={scale} />
        }
      </View>
    )
  }
}

const DefaultDial = ({style = {}, rotate, scale}) => (
  <Animated.View style={[styles.dial, style, {transform: [
    {rotate}, {scale}
  ]}]} >
    <View style={styles.innerDialDecorator}>
      <View style={styles.pointer}/>
    </View>
  </Animated.View>
)

var { width } = Dimensions.get('window')
width = width * 0.425

const styles = StyleSheet.create({
  coverResponder: {
    padding: 20 // needs a minimum
  },
  dial: {
    width: 120, height: 120,
    backgroundColor: 'white',
    borderRadius: 60,
    elevation: 5
  },
  innerDialDecorator: {
    top: 10, left: 10,
    width: 100, height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 3
  },
  pointer: {
    top: 20, left: 20,
    position: 'absolute',
    width: 10, height: 10,
    backgroundColor: 'rgb(221,223,226)',
    borderRadius: 5
  },
})

Dial.propTypes = {
  angle: React.PropTypes.number,
  precision: React.PropTypes.number,
  onValueChange: React.PropTypes.func
}
