# CSS3相关的

## [怎么画出一个三角形和一个梯形](https://segmentfault.com/a/1190000005715074)

> 关键点有哪些？

- border的顺序就是上左下右
- 透明属性是transparent, 先设置所有边的属性是透明的transparent
- 设置某一条边，比如底边（border-bottom）的高为150px,且颜色为green

- 三角形的底为border的两倍，border-bottom为三角形的高(这句话有错误)
- border为三角形的高(**这句话才是正确的**)

```css
/* 先将border全部设置为transparent透明色，然后再将border-bottom加上green颜色 */
#my04{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 150px solid green;
    }
```

- 画出一个梯形，需要注意些什么？

- 仅仅在三角形的基础之上， 增加特定的宽度。

```css
.trapezoid-1 {
    width:100px;
    height:0;
    border: 60px solid transparent;
    border-bottom:100px solid #e5c3b2;
}
```

## [实现一个三栏布局的网页，中间部分要自适应宽度并且优先加载](https://blog.csdn.net/whisper_a/article/details/29262843)

```html
<!-- 中间怎么自适应呢？ -->

                            #box
                            {

                                    width:100%;

                                    float:left;

                            }

                            #middle

                            {

                                    height:100px;

                                    margin:0 300px; //这里是关键

                                    background-color:red;

                            }

                            #left

                            {

                                    height:100px;

                                    width:200px;

                                    float:left;

                                    margin-left:-100%;

                                    position:relative;

                                    left:100px;

                                    background-color:green;

                            }

                            #right

                            {

                                    height:100px;

                                    width:200px;

                                    float:left;

                                    margin-left:-300px;

                                    background-color:blue;

                            }



<body>

                <!--优先加载中间部分，后加载两侧-->

                <div id="box">

                        <div id="middle"></div>

                </div>

                <div id="left"></div>

                <div id="right"></div>
  
          </body> 
```
