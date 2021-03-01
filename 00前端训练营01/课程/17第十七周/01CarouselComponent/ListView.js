import { createElement, Text, Wrapper } from './createElement.js'
import { Timeline, Animation } from './animation'
import { ease, linear } from './cubicBezier'
// import {  } from './gesture';

export class ListView {
  constructor(config) {
    // config
    // console.log('Parent::config', config);
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
    this.state = Object.create(null)
  }

  // set className (v) { // property
  //     console.log('Parent::className', v);
  // }

  setAttribute(name, value) {
    // attribute
    // console.log('Parent::setAttribute', name, value);
    // todo this.root.setAttribute(name, value);
    // 这里将 attribute 存起来，在 render 中处理
    this.attributes.set(name)
    this[name] = value
    // this[name] = value;
  }

  getAttribute(name) {
    return this[name]
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
    let data = this.getAttribute('data')
    return (
      <div class="list-view" style="width:300px;">
        {data.map(this.children[0])}
      </div>
    )
  }
}
