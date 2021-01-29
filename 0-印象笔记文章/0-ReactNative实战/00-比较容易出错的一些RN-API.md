# 常见的API

> keyboardDidHide（Keyboard）   Android环境下 点击物理按钮  收起键盘事件  回调

```js
  import { Keyboard } from 'react-native'
  componentDidMount () {
    this.fixedDepositVM.componentDidMount(this)
    this.fixedDepositVM.ccy = this.props.navigation.getParam('ccy', 'HKD') // TODO 怎么获取  怎么跳转

    if (Platform.OS === 'ios') {
      setTimeout(() => { this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => { this.fixedDepositVM.showDepositPressButton = true }) }, 0)
    } else {
      setTimeout(() => { this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { this.keyboardDidHideAndroid() }) }, 0)
    }
  }

  keyboardDidHideAndroid () {
    this.fixedDepositVM.showDepositPressButton = true
    this.computeDepositAmount()
  }

  componentWillUnMount () {
    if (Platform.OS === 'ios') {
      this.keyboardWillHideListener && this.keyboardWillHideListener.remove()
    } else {
      this.keyboardDidHideListener && this.keyboardDidHideListener.remove()
    }
  }
```

> BackHandler   Android物理键 返回 回调

- Detect hardware button presses for back navigation.
- 只有Android才有物理键返回，IOS是没有的

```js
  import { BackHandler } from 'react-native'
  componentWillMount () {
    // 返回键处理
    if (Platform.OS === 'android') {
      this.androidBackListener = BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
  }
  componentWillUnmount () {
    this.androidBackListener && this.androidBackListener.remove()
  }
```

> Keyboard

- addListener(eventName, callback) 增加键盘事件监听，并在回调函数中处理 相关业务逻辑.
- 组件卸载的时候，记得回收。
- keyboardWillShow 和 keyboardWillHide 在Android中用不了。

```js
import React, { Component } from 'react';
import { Keyboard, TextInput } from 'react-native';

class Example extends Component {
  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    alert('Keyboard Shown');
  }

  _keyboardDidHide () {
    alert('Keyboard Hidden');
  }

  render() {
    return (
      <TextInput
        onSubmitEditing={Keyboard.dismiss}
      />
    );
  }
}
```

> Animated

```js
import { View, Animated, Text, ViewPropTypes as RNViewPropTypes } from 'react-native'
export default class Toast extends Component {
  state = {
    fadeAnimation: new Animated.Value(0),
    shadowOpacity: new Animated.Value(0),
  };

  show (message, bottomHeight, duration = 2000, error = false, warning = false) {
    const dismissTimeout = setTimeout(() => {
      this.hide()
    }, duration)
    clearTimeout(this.state.dismissTimeout)
    this.setState(
      {
        fadeAnimation: new Animated.Value(0),
        shadowOpacity: new Animated.Value(0),
      },
      () => {
        Animated.timing(this.state.fadeAnimation, { toValue: 1 }).start()
        Animated.timing(this.state.shadowOpacity, { toValue: 0.5 }).start()
      }
    )
  }

  render () {
    return (
      <Animated.View
        style={[
          styles.shadow,
          [styles.container, { bottom: this.state.bottomHeight }],
          { opacity: this.state.fadeAnimation, shadowOpacity: this.state.shadowOpacity }
        ]}
      >
        <View style={messageStyles}>
          {this.props.getMessageComponent(this.state.message, {
            error: this.state.error,
            warning: this.state.warning
          })}
        </View>
      </Animated.View>
    )
  }
}

Toast.defaultProps = {
  getMessageComponent (message) {
    return (
      <Text style={this.messageStyle}>
        {message}
      </Text>
    )
  }
}
```

> Dimensions (尺寸)

- addEventListener 
- get
- removeEventListener
- set
- 用于 获取到屏幕页面的 宽高尺寸

```js
import { Dimensions } from 'react-native'
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
```
