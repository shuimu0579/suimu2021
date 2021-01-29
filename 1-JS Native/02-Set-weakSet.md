### new WeakSet([iterable])

Iterable is an Array or other iterable object whose elements are key-value pairs (2-element Arrays)


### weakSet and Set compared

> weakSet and Set diffience:<br>
In contrast to Sets, WeakSets are collections of <b>objects</b> only and not of arbitrary values of any type.<br><br>
The WeakSet is weak(object不会被存储在 集合中): References to objects in the collection are held weakly. If there is no other reference to an object stored in the WeakSet, they can be garbage collected. That also means that <b>there is no list of current objects stored in the collection</b>. WeakSets are not enumerable.
