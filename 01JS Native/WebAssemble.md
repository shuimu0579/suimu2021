> webAssembly 就是 c++ 编译之后，后缀为.wasm 的文件，这种.wasm 的文件 可以供js调用，从而在现代web页面中使用。

> 既然已经有了js,那为什么还需要webAssemble 呢？ 因为js是单线程的，它不像java那样是多线程的，因此js的计算性能就不高，<br><br>
而我们知道，C++这种底层的高级语言，它们的性能是很高的，将C++编译之后形成的.wams 的文件，也有很强的计算能力。<br><br>
这样算下来，javascript + webAssembly 就是 很好的组合了。

> EOS 的底层就是 C++,，中间层就是 webAssembly，最近（2019.04）出现了基于javascript的开发。<br><br>
>所以可见，webAssembly 有多么重要！



### methods

> WebAssembly.compileSt reaming()
用于编译一个 WebAssembly.Module

> WebAssembly​.instantiate​Streaming()
compiles and instantiates a WebAssembly module directly from a streamed underlying source. <br><br>
and this is the most efficient, optimized way to load wasm code.

> WebAssembly.validate()
