/*
    最基本的散列表
    散列表（又叫做哈希表），是一个数组
    */

// 哈希表（Hash Table，也叫散列表），是根据键（Key）而直接访问在内存存储位置的数据结构。
// 也就是说，它通过计算一个关于键值的函数，将所需查询的数据映射到表中一个位置来访问记录，这加快了查找速度。
// 这个映射函数称做哈希函数，存放记录的**数组**称做哈希表。


class HashTable {
    constructor() {
            this.table = [];
        }
        //散列函数
    loseHashCode(key) {
            var hash = 0;
            //从ASCII表中查到的ASCII值加到hash中
            for (var i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i);
            }
            //为了得到比较小的数值，我们会用hash和任意数除余
            return hash % 37;
        }
        //向散列表增加一个新的项
    put(key, value) {
            var position = this.loseHashCode(key);
            console.log(position + '-' + key);
            this.table[position] = value;
        }
        //根据键从散列表删除值
    remove(key) {
            this.table[this.loseHashCode(key)] = undefined;
        }
        //返回根据键值检索到的特定的值
    get(key) {
        console.log(this.table[this.loseHashCode(key)])
    }
    print() {
        for (var i = 0; i < this.table.length; ++i) {
            if (this.table[i] !== undefined) {
                console.log(i + ':' + this.table[i]);
            }
        }
    }
}
var hash = new HashTable();
debugger
hash.put('Gandalf', 'gandalf@email.com');
debugger
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
hash.remove('Gandalf')
hash.get('Gandalf')
hash.get('Tyrion')
hash.print()