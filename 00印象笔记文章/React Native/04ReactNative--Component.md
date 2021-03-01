# 常见的Component


> AppRegistry (组件注册)
> YellowBox.ignoreWarnings (忽略调试警告)
> Platform (判断运行平台)
> useScreens
- [react-native-screens](https://github.com/kmagiera/react-native-screens) 
> CodePush
- [react-native-code-push](https://github.com/microsoft/react-native-code-push)
> Orientation
- [react-native-orientation](https://github.com/yamill/react-native-orientation) 
```js
import { AppRegistry, YellowBox, Platform } from 'react-native'
import { useScreens } from 'react-native-screens'
import CodePush from 'react-native-code-push'
import Orientation from 'react-native-orientation'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module ', 'react-native-extra-dimensions'])

AppRegistry.registerComponent('App', () => App)

useScreens(Platform.OS === 'ios')
<View style={Platform.OS === 'ios' ? styles.container : styles.containerAndroid}>
  <StatusBar barStyle='dark-content' backgroundColor='#ecf0f1' />
  <AppNav />
  <ToastContainer messageStyle={styles.toast} />
</View>

componentDidMount () {
  const { screen } = this.props
  // 判斷是否首次啟動
  if (screen === undefined || screen.length === 0) {
    setTimeout(() => {
      ZAEvent.emit(EventMessage.APP_DID_START, '')
    }, 1000)
    CodePush.sync({
      installMode: CodePush.InstallMode.IMMEDIATE,

      updateDialog: true
    })
  }

  // this locks the view to Portrait Mode
  Orientation.lockToPortrait()

  // this locks the view to Landscape Mode
  // Orientation.lockToLandscape();

  // this unlocks any previous locks to all Orientations
  // Orientation.unlockAllOrientations();

  // Orientation.addOrientationListener(this._orientationDidChange)
}
```


> TouchableOpacity (渐隐效果，类似于 button 按钮的作用)
- A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.
```js
<TouchableOpacity onPress={() => {
  if (this.props.data.length === 0) {
    this.props.onHeaderRefresh && this.props.onHeaderRefresh(ZARefreshState.HeaderRefreshing)
  } else {
    this.props.onFooterRefresh && this.props.onFooterRefresh(ZARefreshState.FooterRefreshing)
  }
}}
>
  {footerFailureComponent || (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{footerFailureText}</Text>
    </View>
  )}
</TouchableOpacity>
```


> TouchableWithoutFeedback (没有返回view的 button)
- It is therefore required that any intermediary components pass through those props to the underlying React Native component.
- 


> TouchableHighlight (高亮效果，类似于 button 按钮的作用)
- On press down, the opacity of the wrapped view is decreased, which allows the underlay color to show through, darkening or tinting the view.
- TouchableHighlight must have one child (not zero or more than one). If you wish to have several child components, wrap them in a View.
```js
<TouchableHighlight
  key={key}
  style={styles.wrapper}
  underlayColor={UNDERLAYCOLOR_NUM}
  onPress={() => {
    this.onPressNum(key)
  }}
>
  <View style={styles.bd}>
    <Text style={styles.mainText}>{key}</Text>
  </View>
</TouchableHighlight>
```


> ActivityIndicator (一个loadin图标)
- Displays a circular loading indicator.
```js
<ActivityIndicator size='small' color='#888888' />
```


> Modal (弹框)
- present content above an enclosing view
```js
<View style={{marginTop: 22}}>
  <Modal
    animationType="slide"
    transparent={false}
    visible={this.state.modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}>
    <View style={{marginTop: 22}}>
      
    </View>
  </Modal>
  <TouchableHighlight
    onPress={() => {
      this.setModalVisible(true);
    }}>
    <Text>Show Modal</Text>
  </TouchableHighlight>
</View>
```


> Animated (动画效果)
- 


> Swiper  (轮播图) 
- [Swiper](https://github.com/leecade/react-native-swiper)
```js
import Swiper from 'react-native-swiper';
<Swiper
  autoplay={false}
  showPagination
  dotColor="#FBA009"
  activeDotColor="#F96029"
  horizontal
  width={this.props.contentStyle.width}
  height={this.props.contentStyle.height}
  loadMinimal
>
  {
    this.renderItems(this.props.data.content)
  }
</Swiper>
```


> ImageBackground  (背景图) 
- A common feature request from developers familiar with the web is background-image.
- Note that you must specify some width and height style attributes.
```js
<ImageBackground
  style={styles.firstContainer}
  source={require('../images/defaultBg.png')}
  resizeMode='stretch'
>
  <View style={styles.secondContainer}>
  </View>
</ImageBackground>
```


> Progress (进度条)
- @ant-design/react-native(https://github.com/ant-design/ant-design-mobile-rn)
```js
import { Progress } from '@ant-design/react-native'
import { Button, DatePickerView } from '@ant-design/react-native'

<View style={styles.progressBox}>
  <Progress
    percent={percent}
    unfilled
    style={styles.progressStyle}
    barStyle={styles.progressActiveStyle}
  />
</View>

<Button style={[styles.timeStatusBtn, timeStatus === 1 ? styles.currentStatus : null]} onClick={() => this.onChangeTimeStatus(1)}>
  <Text style={[styles.btnText, timeStatus === 1 ? styles.currentBtnColor : null]}>近一月</Text>
</Button>

<View style={styles.pickerView}>
  {
    currentTime === 'start'
      ? <DatePickerView
        mode='date'
        value={dateStartValue}
        onChange={this.onChangeStartDate}
      />
      : <DatePickerView
        mode='date'
        value={dateEndValue}
        onChange={this.onChangeEndDate}
      />
  }
</View>
```
