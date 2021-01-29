# 在 Table 组件中嵌套 dropdown 组件

```html
<el-table-column show-overflow-tooltip align="left" min-width="200px">
  <template slot="header">
    <el-divider direction="vertical"></el-divider>
    <span>操作</span>
  </template>
  <template slot-scope="scope">
    <el-dropdown trigger="hover">
      <span class="el-dropdown-link">更多</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          @click.native="
                    restartConnect('REBOOT', scope.row.id, handleSelectedValue(scope.row.value, scope.row.schemeNames))
                  "
          >重启</el-dropdown-item
        >
        <el-dropdown-item
          @click.native="
                    handleOperate('REFRESH', scope.row.id, handleSelectedValue(scope.row.value, scope.row.schemeNames))
                  "
          >刷新</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </template>
</el-table-column>
```

```js
handleOperate(opt, id, scheme) {
    let _self = this
    let connectOperateData
    connectOperateData = { id, opt, scheme }
    postRequest(connectOperate, connectOperateData)
    .then(ret => {
        if (200 === ret.code) {
        if (opt === 'STOP') {
            _self.handleStopConnect()
        } else if (opt === 'START') {
            _self.handleStartConnect()
        } else if (opt === 'UPLOAD') {
            _self.handleUploadConnect()
        } else if (opt === 'REFRESH') {
            _self.handleRefreshConnect()
        } else if (opt === 'REBOOT') {
            _self.handleRebootConnect()
        }
        }
    })
    .catch(err => {
        _self.handleConnectError(err)
    })
},
handleRefreshConnect() {
    const msg = `
    <div style="color: #26b175">
        <i
        style="font-size: 28px; "
        class="el-icon-success"
        ></i>
        <span style="font-size: 16px; padding-left:6px; position: relative; top:-4px ">刷新完成</span>
    </div>
    `
    this.showMessage(msg)
},
```
