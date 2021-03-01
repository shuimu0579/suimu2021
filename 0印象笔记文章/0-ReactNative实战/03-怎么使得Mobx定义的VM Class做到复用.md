# 设计模式

### 单例模式 和 Class抽象类设计模式

- 在VM的定义中，选择抽象类设计模式。当在screen中需要用到的时候，就new出来一个实例化的vm
- 在不同的页面里面，new出来的实例化的vm，是不能共享上下文信息的。 也就是说 不同的screen之间的数据不能通过全局的vm共通。在这种情况下，就涉及到了Screen之间的双向通讯，详见《02-Screen之间怎么双向通讯》

- 那么每一个Screen里面new 出来一个 实例化的vm 有什么好处?
  - 好处就是页面之间能做到天然数据解耦，数据的更改不会影响全局所有的screen。 这样无形之中也降低了数据修改驱动Screen改变的复杂度。
  - 如果页面是不同的人做的，不同的人之间肯定不会共享 同一份数据。 Screen页面之间数据的传递就通过回调进行

### 一个实际的例子

```js
// demoScreen.js  实例化一个demoVM  this.newVM = new demoVM()

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  Keyboard
} from 'react-native'
import demoVM from '../viewModal/demoVM'
import { observer, Observer } from 'mobx-react'

@observer
export default class demoScreen extends Component {
  constructor (props) {
    super(props)
    this.newVM = new demoVM()
    this.state = {
    }
  }

  componentDidMount () {
    this.newVM.componentDidMount(this)
    if (Platform.OS === 'ios') {
      setTimeout(() => { this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => { this.newVM.BBB = true }) }, 0)
    } else {
      setTimeout(() => { this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { this.keyboardDidHideAndroid() }) }, 0)
    }
    // 监听页面消失
    this.willBlurSubcription = this.props.navigation.addListener(
      'willBlur',
      payload => {
        console.log('demoScreen willBlur')
        this.newVM.showDepositModal = false
      }
    )

    this.newVM.AAA(this.newVM.ddd).then((response) => {
    }).catch(error => {
      ZAErrorUtils.handleError(error)
      this.newVM.GGG = Layer.CONTENT
    })
  }

  componentWillUnMount () {
    if (Platform.OS === 'ios') {
      this.keyboardWillHideListener && this.keyboardWillHideListener.remove()
    } else {
      this.keyboardDidHideListener && this.keyboardDidHideListener.remove()
    }
    // 移除监听
    this.willBlurSubcription.remove()

    this.newVM.componentWillUnMount()
  }

  keyboardDidHideAndroid () {
    this.newVM.BBB = true
  }

  renderMyView () {
    const { ddd = 'HKD', demo1Data } = this.newVM
    const CCC = this.newVM.demoData.filter((item) => item.bondSelected === true)
    const { bondSelected = false, isBondDisabled = false, couponNumber } = CCC[0] || {}
    const DDD = bondSelected && !isBondDisabled ? couponNumber : '0'
    const { interest = '0.00' } = this.newVM.depositTrailResult || {}
    const demo2Data = this.newVM.fixedListData.filter((item) => item.selected === true)
    const { yearRate = '0' } = demo2Data[0] || {}
    const FFF = this.newVM.mmm(Number(DDD), Number(yearRate))
    return (
      <View>
      </View>
    )
  }

  render () {
    return (
      <Observer>
        {
          () => {
            return (
              <ZAScreenComponent
                ref={(v) => { this.myScreen = v }}
                navigation={this.props.navigation}
                style={styles.container}
                goBackAction={() => {
                  setTimeout(() => {
                    this.newVM.reset()
                    this.props.navigation.pop()
                  }, 900)
                }}
                inputAccessoryView={
                  <View>
                    {this.newVM.BBB ? <ZAProcessButton
                      source={theme.image.ICO_right}
                      title={ZAI18n.t('dict_266_1004592')}
                      onPress={() => this.onDepositPress()}
                      style={styles.depositButton}
                    /> : null}
                    {this.newVM.BBB ? null : <View style={styles.finishedButtonLayout}>
                      <TouchableOpacity onPress={() => this.finishedImportText()}><Text style={styles.finishedButtonText}>{ZAI18n.t('dict_266_1006498')}</Text></TouchableOpacity>
                    </View>}
                  </View>
                }
                GGG={this.newVM.GGG}
              >
                { this.renderMyView() }
                <ZANormalAlert />
              </ZAScreenComponent>
            )
          }
        }
      </Observer>
    )
  }
}

const styles = StyleSheet.create({
  XXX: {
    flex: 1,
    backgroundColor: 'white'
  }
```

> demoVM.js里面， class demoVM {}  export default demoVM

```js
// demoVM.js
import { observable, action, computed } from 'mobx'

class demoVM {
  @observable demo01 = Hac.aaa

  @action
  componentDidMount (demo03) {
    this.demo02 = demo03.props.navigation.getParam('bbb', 3)

    this.demo03 = demo03

    this.ccc(this.ddd)
  }
  @action
  componentWillUnMount () {
    // 重置数据源，否则下次进来数据源已有数据
    this.reset()
  }

  @action
  async ccc (ddd) {
    const params = {
      ddd,
      eee: '002',
      fff: 'TD000001'
    }
    const json = await ggg.fetchData(params)
    return json
  }

  @computed get hhh () {
    return false
  }

  mmm = (num1, num2) => {
    const ppp = (num1.toString().split('.')[1] || '').length
    const qqq = (num2.toString().split('.')[1] || '').length
    const sss = Math.pow(10, Math.max(ppp, qqq))
    return (num1 * sss + num2 * sss) / sss
  }

  // 重置界面状态
  @action
  reset () {
    this.demo01 = Hac.CONTENT  // 清空提示
  }
}

export default demoVM
```
