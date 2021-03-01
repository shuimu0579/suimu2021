import { createElement, Text, Wrapper } from './createElement.js'
import { Timeline, Animation } from './animation'
import { ease, linear } from './cubicBezier'
// import {  } from './gesture';

export class TabPanel {
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

  select(i) {
    for (let view of this.childViews) {
      view.style.display = 'none'
    }
    this.childViews[i].style.display = ''

    for (let view of this.titleView) {
      view.classList.remove('selected')
    }
    this.titleView[i].classList.add('selected')
    // this.titleView.innerText = this.children[i].title
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }

  render() {
    this.childViews = this.children.map(child => <div style="width:300px;min-height:300px">{child}</div>)
    this.titleViews = this.children.map((child, i) => (
      <span
        onClick={() => this.select(i)}
        style="background-color:lightgreen; margin:5px 5px 0px 5px; font-size:24px; width:300px;min-height:300px;"
      >
        {child.getAttribute('title') || ' '}
      </span>
    ))
    setTimeout(() => this.select(0), 16)

    return (
      <div class="tab-panel" style="width:300px;">
        <h1 style=" width:300px; margin:0">{this.titleViews}</h1>
        <div style="border:solid 1px lightgreen;">{this.childViews}</div>
      </div>
    )
  }
}
