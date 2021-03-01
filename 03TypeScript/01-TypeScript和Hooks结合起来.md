# TypeScript 和 Hooks 结合起来

> [TypeScript 中使用React Hook](https://zhuanlan.zhihu.com/p/66242790)

- TypeScript中使用useReducer

```js
import React, { useReducer } from "react";
const initialState: AccountState = {
  loginWithPwd: false,
  pwdActualAccount: '';
  pwdDisplayAccount: '';
  smsActualAccount: '';
  smsDisplayAccount: '';
};

type ReducerAction =
    | { type: 'switchToSmsLogin' | 'switchToAccountLogin' }
    | {
        type: 'changePwdAccount' | 'changeSmsAccount';
        payload: {
            actualAccount: string;
            displayAccount: string;
        };
    };

interface AccountState {
    loginWithPwd: boolean;
    pwdActualAccount: string;
    pwdDisplayAccount: string;
    smsActualAccount: string;
    smsDisplayAccount: string;
}

function loginReducer(loginState: AccountState, action: ReducerAction): AccountState {
    switch (action.type) {
        case 'switchToAccountLogin':
            return {
                ...loginState,
                pwdActualAccount: loginState.smsActualAccount,
                pwdDisplayAccount: loginState.smsDisplayAccount,
                loginWithPwd: !loginState.loginWithPwd,
            };
        // 密码登陆页账号发生变化
        case 'changePwdAccount':
            return {
                ...loginState,
                pwdActualAccount: action.payload.actualAccount,
                pwdDisplayAccount: action.payload.displayAccount,
            };
        default:
            return loginState;
    }
}

// 可以从 loginReducer 推断出
// loginState 的类型 满足 AccountState interface
// dispatchLogin 接受的参数满足 ReducerAction 类型
const [loginState, dispatchLogin] = useReducer(loginReducer, initialState);

dispatchLogin({ type: 'switchToAccountLogin' });
dispatchLogin({
    type: 'changePwdAccount',
    payload: {
        actualAccount,
        displayAccount,
    },
});

// 错误： 不能将 logout 类型赋值给 type
dispatchLogin({ type: 'logout' });
// 错误： { type: 'changePwdAccount' } 类型缺少 payload属性
dispatchLogin({ type: 'changePwdAccount' });
```

- Hooks 里面运用 useReducer 的一个好的案例

```js
import React, { useReducer } from "react";
const initialState = {
  count: 0
};
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      throw new Error();
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 5 })}>
        -
      </button>
    </>
  );
}
```
