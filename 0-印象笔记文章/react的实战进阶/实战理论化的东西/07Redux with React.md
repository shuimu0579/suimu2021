### react-redux


Redux async-action 官方文档： https://redux.js.org/advanced/async-actions

### 关于 mapStateToProps，mapDispatchToProps  的几种使用方式

- mapDispatchToProps 既可以是一个对象，又可以是一个函数，具体用法，详见：https://www.imweb.io/topic/5a426d32a192c3b460fce354

- 异步action 到底是怎么玩的？
其实所谓的异步action,不过就是几个同步action 的组合。<br>
具体来说就是，就是获取到api 返回数据之前的状态state1; <br>
response 返回success时候的状态state2 <br>
response 返回error时候的状态state3 <br>
具体参考oneident-recovery-ui-with-redux 这个项目里面 src/pages/recovery/components/RecoveryRight.jsx 
- state1: COIApp.jsx中，组件的未加载完成时候的 loading 状态。    
- state2:  triggerCaptchaDisplay() 的调用在 handleError(error) 里面
- state3: smsSent() 的调用在 sendSMS() 中 获得response之后

> 而 whatToTriggerCaptcha('sms') 就是纯粹的 同步action了。




- 将单个action 和 reducer 写在一个js 文件里面, 便于维护和理解。

参考这个文档：
https://github.com/supnate/rekit-todomvc/tree/master/src/features/todo/redux

```javascript
//actions.js
export { addTodo } from './addTodo';
export { completeTodo } from './completeTodo';
export { deleteTodo } from './deleteTodo';
export { clearCompleted } from './clearCompleted';
export { completeAll } from './completeAll';
export { editTodo } from './editTodo';

//reducers.js
import initialState from './initialState';
import { reducer as addTodoReducer } from './addTodo';
import { reducer as completeTodoReducer } from './completeTodo';
import { reducer as deleteTodoReducer } from './deleteTodo';
import { reducer as clearCompletedReducer } from './clearCompleted';
import { reducer as completeAllReducer } from './completeAll';
import { reducer as editTodoReducer } from './editTodo';

const reducers = [
  addTodoReducer,
  completeTodoReducer,
  deleteTodoReducer,
  clearCompletedReducer,
  completeAllReducer,
  editTodoReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}

//constants.js
export const TODO_ADD_TODO = 'TODO_ADD_TODO';
export const TODO_COMPLETE_TODO = 'TODO_COMPLETE_TODO';
export const TODO_DELETE_TODO = 'TODO_DELETE_TODO';
export const TODO_CLEAR_COMPLETED = 'TODO_CLEAR_COMPLETED';
export const TODO_COMPLETE_ALL = 'TODO_COMPLETE_ALL';
export const TODO_EDIT_TODO = 'TODO_EDIT_TODO';

//addTodo.js
import { TODO_ADD_TODO } from './constants';

export function addTodo(text) {
  return {
    type: TODO_ADD_TODO,
    text,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TODO_ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
            completed: false,
            text: action.text,
          },
        ],
      };

    default:
      return state;
  }
}

//completeTodo
import { TODO_COMPLETE_TODO } from './constants';

export function completeTodo(id) {
  return {
    type: TODO_COMPLETE_TODO,
    id,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TODO_COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo)),
      };

    default:
      return state;
  }
}

```
