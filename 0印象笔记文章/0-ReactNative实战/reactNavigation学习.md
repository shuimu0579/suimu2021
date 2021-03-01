#React Navigation

> [React Navigation中文版](https://reactnavigation.org/docs/zh-Hans/params.html)
> [React Navigation英文版](https://reactnavigation.org/docs/en/params.html)

## React Navigation API
> [React Navigation API文档](https://reactnavigation.org/docs/en/navigation-prop.html)
- Common API reference (Each screen component in your app is provided with the navigation prop automatically.) 
- 只要是screen component，就可以用下面的这些API
```js
navigate
getParam
setParams
state
goBack

isFocused
addListener

dispatch
dangerouslyGetParent
```
- If the navigator is a stack navigator, 下面这几个方法也可以用
```js
push
pop
popToTop
replace
reset
dismiss
```
- If the navigator is a drawer navigator, the following are also available
```js
openDrawer
closeDrawer
toggleDrawer
```

### 怎么在根组件 App.js 中,确立一个导航器
```js
// In App.js in a new project
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailsScreen'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);

// HomeScreen
export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

// DetailsScreen
export default class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}
```

## screen之间怎么跳转
- 怎么跳转到一个新的screen
- 怎么多次跳转到同一个路由
- 怎么回退到上一级active screen
```js
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
```

## 怎么传递参数给路由 以及 怎么获取参数
- 怎么将参数传递给路由 Pass params to a route 
- this.props.navigation.navigate('Details', {...params})
```js
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
      </View>
    );
  }
}
```

- Read the params in your screen component  在组件中怎么读取这些参数
- this.props.navigation.getParam('itemId', 'NO-ID')
- this.props.navigation.push('Details', {...params})
```js
class DetailsScreen extends React.Component {
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
```

- 跳转到特定页面  this.props.navigation.navigate('Base.CustomerHelpScreen')
- 跳转到上一页      this.props.navigation.pop()