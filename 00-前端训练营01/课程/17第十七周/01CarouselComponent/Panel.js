import { createElement, Text, Wrapper } from './createElement.js'
import { Timeline, Animation } from './animation'
import { ease, linear } from './cubicBezier'
// import {  } from './gesture';

export class Panel {
  constructor(config) {
    // config
    // console.log('Parent::config', config);
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
  }

  // set className (v) { // property
  //     console.log('Parent::className', v);
  // }

  setAttribute(name, value) {
    // attribute
    // console.log('Parent::setAttribute', name, value);
    // todo this.root.setAttribute(name, value);
    // 这里将 attribute 存起来，在 render 中处理
    this.attributes.set(name, value)
    this[name] = value
    // this[name] = value;
  }

  appendChild(child) {
    // children
    // console.log('Parent::appendChild', child);
    this.children.push(child)
    // child.mountTo(this.root);    // 这里不要直接 moute
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }

  render() {
    return (
      <div class="panel" style="border:solid 1px lightgreen; width:300px;">
        <h1 style="background-color:lightgreen; width:300px;margin:0px;">{this.title}</h1>
        <div style="width:300px;min-height:300px">{this.children}</div>
      </div>
    )
  }
}
