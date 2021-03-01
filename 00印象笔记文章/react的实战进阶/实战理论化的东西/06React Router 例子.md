
> 一个实用的例子，用于选项卡的切换：

```javascript 
import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { MemoryRouter } from "react-router";

const Home = () => <h1>Home</h1>;
const Hello = () => <h1>Hello</h1>;
const About = () => <h1>About Us</h1>;

export default class RouterSample extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <ul id="menu">
            <li>
              <Link to="/1/home">Home</Link>
            </li>
            <li>
              <Link to="/hello">Hello</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>

          <div id="page-container">
            <Route path="/1/home" component={Home} />
            <Route path="/hello" component={Hello} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}
```

> 路由参数的传递

```javascript
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const Topic = ({ match }) => (
  <h1>Topic {match.params.id}</h1>
);

export default class RouterParams extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <ul id="menu">
            <li>
              <Link to="/topic/1">Topic 1</Link>
            </li>
            <li>
              <Link to="/topic/2">Topic 2</Link>
            </li>
            <li>
              <Link to="/topic/3">Topic 3</Link>
            </li>
          </ul>

          <div id="page-container">
            <Route path="/topic/:id" component={Topic} />
          </div>
        </div>
      </Router>
    );
  }
}
```

> 嵌套路由的实现

```javascript
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const Category = ({ match }) => (
  <h1>Sub Category {match.params.subId}</h1>
);

const SubCategory = ({ match }) => (
  <div>
    <h1>Category {match.params.id}</h1>

    <ul id="menu">
      <li>
        <Link to={`/category/${match.params.id}/sub/1`}>
          Sub Category 1
        </Link>
      </li>
      <li>
        <Link to={`/category/${match.params.id}/sub/2`}>
          Sub Category 2
        </Link>
      </li>
      <li>
        <Link to={`/category/${match.params.id}/sub/3`}>
          Sub Category 3
        </Link>
      </li>
    </ul>
    <div id="page-container-2">
      <Route
        path="/category/:id/sub/:subId"
        component={Category}
      />
    </div>
  </div>
);

export default class NestedRoute extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <ul id="menu">
            <li>
              <Link to="/category/1">Category 1</Link>
            </li>
            <li>
              <Link to="/category/2">Category 2</Link>
            </li>
            <li>
              <Link to="/category/3">Category 3</Link>
            </li>
          </ul>

          <div id="page-container">
            <Route
              path="/category/:id"
              component={SubCategory}
            />
          </div>
        </div>
      </Router>
    );
  }
}
```
