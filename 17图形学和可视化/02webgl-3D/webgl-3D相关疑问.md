# webgl-3D相关疑问

> 需求：在鼠标hover的时候，怎么显示出当前模型的轮廓，并可以点击选中。

- three.js里面 有 [webgl_postprocessing_outline](https://threejs.org/examples/?q=webgl_postprocessing_outline#webgl_postprocessing_outline)

- 后处理时，要对初始片元进行二次加工，canvas自带的抗锯齿功能就被舍弃了,在后处理时，three提供了自己的算法抗锯齿,FXAA 就是用来抗锯齿的。
- 如果 FXAA 做了模糊的处理，导致场景文字变得模糊,那就把文字和场景分一下层，在两个canvas中实现。

> 流水线型的动画效果

- [采用视频贴图的方式](https://threejs.org/docs/index.html?q=video#api/en/textures/VideoTexture)