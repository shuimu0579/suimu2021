# canvas2D相关疑问

> 驱动动画的方法：setTimeout(fn,time)、setInterval(fn,time)、requestAnimationFrame(fn)

setTimeout(fn,time)和setInterval(fn,time)

- 优点是使用方便，动画的使用间隔可以自定义
- 缺点是隐藏浏览器标签之后，会依旧运行，造成资源浪费；并且与浏览器的刷新频率不一致。

requestAnimationFrame(fn)

- 优点：性能更加优良。隐藏浏览器标签之后，便不会运行。与浏览器刷新频率同步。
- 缺点：动画的时间间隔无法确定。

> 为什么using CSS 2D transforms and translate()，而不是using position:absolute and top/left

- [Why Moving Elements With Translate() Is Better Than Pos:abs Top/left](https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/)

- style.top/style.left是在CPU中渲染的, computed on the CPU。
- CSS 2D transforms 是在 GPU中渲染的，不会产生异步阻塞，渲染效率会很高。
