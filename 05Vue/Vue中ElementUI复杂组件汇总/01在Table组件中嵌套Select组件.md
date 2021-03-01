# 在 Table 组件中嵌套 Select 组件

```html
// template 注意 scope.row.value 和 scope.row.schemeNames 的使用
<el-table-column prop="" align="left" min-width="200px">
  <template slot="header">
    <el-divider direction="vertical"></el-divider>
    <span>方案</span>
  </template>
  <template slot-scope="scope">
    <el-select v-model="scope.row.value" class="select-bg program-select">
      <el-option
        v-for="item in scope.row.schemeNames"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </template>
</el-table-column>
```

```js
// 在这里面定义value
data() {
    return {
        value: 0
    }
},

// 注意 value 动态数据的定义
getDataList() {
    let _self = this
    // 清空原来的数据
    _self.bizmodelList = []
    let loadingInstance = Loading.service({
        background: 'rgba(255, 255, 255, 0.3)',
        lock: true,
        text: '数据加载中……',
    })
    postRequest(connectList, {
    pagesize: _self.pageSize,
    pageno: _self.currentPage,
    search: _self.search,
    })
    .then(ret => {
        _self.$nextTick(() => {
        loadingInstance.close()
        })
        if (200 === ret.code) {
        let result = ret.data || {}
        // 增加这一句解决IE下不能在初始化页面后再次赋值问题
        // _self.currentPage = _self.currentPage <= 0 ? 1 : _self.currentPage
        _self.currentPage = result.pageno
        _self.pageSize = result.pagesize
        _self.totalCount = result.totalcount
        console.log('result.list...', JSON.stringify(result.list))

        result.list.forEach(ele => {
            let arr = ele.schemeNames.map((item, index) => {
            return {
                label: item,
                name: item,
                value: index + 1,  // 这里的value 与下面的value 是配套使用的
            }
            })
            _self.bizmodelList.push({
            machineName: ele.machineName,
            machineMac: ele.machineMac,
            schemeNames: [
                {
                label: '全部',
                name: 'ALL',
                value: 0,
                },
                ...arr,
            ],
            userName: ele.userName,
            ipAddress: ele.ipAddress,
            value: 0,  // 这里的value 与上面的value 是配套使用的
            id: ele.id,
            })
        })

        console.log('_self.bizmodelList...', _self.bizmodelList)
        }
    })
    .catch(() => {
        _self.$nextTick(() => {
        loadingInstance.close()
        })
    })
}
```
