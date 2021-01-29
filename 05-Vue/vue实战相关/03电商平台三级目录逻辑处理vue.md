## 电商平台三级目录

```js
<template slot-scope="scope">
    <div class="nav" v-if="scope.data.id === '1'" @mouseleave="handleCategoryHide">
        <ul class="type">
            <li class="navPanelLeft" v-for="(menu, key) in types" :key="key" :id="menu.id" @mouseenter="handleListMouseEnter" @mouseleave="handleListMouseLeave">
                <router-link
                    :to="{ path: '/supply', query: { isFromSidebar: true, level: '1', selectedCategory: encodingSelected(menu.name), silderbarCategoryID: menu.id } }"
                >
                    <span>{{ menu.name }}</span>
                </router-link>
                <i class="el-icon-arrow-right"></i>
            </li>
        </ul>
    </div>
    <div class="type01" :id="filterTypes.id" v-show="isCategoryShow" @mouseenter="handleCategoryShow" @mouseleave="handleCategoryHide">
        <ul>
            <li class="navPanelRight" v-for="(menu, key) in filterTypes.childList" :key="key">
                <router-link
                    :to="{
                        path: '/supply',
                        query: {
                            isFromSidebar: true,
                            level: '2',
                            selectedCategory: encodingSelected(menu.name),
                            isCategoryShow: false,
                            sidebarClassID: menu.id,
                            parentid: menu.parent,
                        },
                    }"
                >
                    <span class="rightTitle">{{ menu.name }}</span>
                </router-link>
                <div class="rightList">
                    <router-link
                        :to="{
                            path: '/supply',
                            query: {
                                isFromSidebar: true,
                                level: '3',
                                selectedCategory: encodingSelected(menu01.name),
                                isCategoryShow: false,
                                isClassShow: false,
                                sidebarItemID: menu01.itemid,
                            },
                        }"
                        v-for="(menu01, key01) in menu.subChildList"
                        :key="key01"
                    >
                        <span>{{ menu01.name }}</span>
                    </router-link>
                </div>
            </li>
        </ul>
    </div>
</template>


<script>
data() {
  types:[]
},
methods:{
  handleListMouseEnter(event) {
      this.isCategoryShow = true;
      const levelOneItemId = event.target.id;
      console.log("levelOneItemId", levelOneItemId);
      const selectedListByItemId = this.types.filter(item => item.id === event.target.id);
      this.filterTypes = selectedListByItemId[0];
      if (event.target) {
          event.target.style.backgroundColor = "#1144d4";
      }
  },
  handleListMouseLeave() {
      if (event.target) {
          event.target.style.backgroundColor = "#275fff";
      }
  },
  handleCategoryShow(event) {
      this.isCategoryShow = true;
      const targetDOM = document.getElementById(event.target.id);
      if (targetDOM) {
          targetDOM.style.backgroundColor = "#1144d4";
      }
  },
  handleCategoryHide(event) {
      this.isCategoryShow = false;
      const targetDOM = document.getElementById(event.target.id);
      if (targetDOM) {
          targetDOM.style.backgroundColor = "#275fff";
      }
  },
  filterBannerSiderbar(sidebarData) {
      console.log("sidebarData...", sidebarData);
      const arr = [];
      let listWithChildList = [];
      let sidebarList = [];
      sidebarData.forEach(item => {
          if (item.level === "1") {
              arr.push({ name: item.name.zh_CN, id: item.id, itemid: item.itemid, childList: [], level: "1" }); // TODO  由于涉及中英文的切换，现在的title初步定为name.zh_CN
          }
          listWithChildList = arr.map(childItem => {
              if (childItem.id === item.parent && item.level === "2") {
                  childItem.childList.push({ name: item.name.zh_CN, id: item.id, itemid: item.itemid, parent: item.parent, subChildList: [], level: "2" });
              }
              return { ...childItem, childList: childItem.childList };
          });
      });

      sidebarData.forEach(item => {
          sidebarList = listWithChildList.map(i => {
              i.childList = i.childList.map(subChildItem => {
                  if (subChildItem.id === item.parent && item.level === "3") {
                      subChildItem.subChildList.push({ name: item.name.zh_CN, id: item.id, itemid: item.itemid, level: "3" });
                  }
                  return { ...subChildItem, subChildList: subChildItem.subChildList };
              });
              return { ...i, childList: i.childList };
          });
      });
      return sidebarList;
  },
},
created() {
  // 获取行业分类三级目录 接口数据
  let HOME_CATEGORY_DATA = { method: "getData", platformid: cq_config.platformid };
  // this.types = slideData;
  // console.log("this.types...", this.types);
  // this.$util.setSessionData(this.$GLOBAL.SESSION_SIDEBAR_CATEGORISE, JSON.stringify(this.types));
  // console.log("this.types...", this.types);
  request.post(GLOBAL.HOME_CATEGORY, HOME_CATEGORY_DATA).then(res => {
      console.log(res);
      if (res.success) {
          _this.types = _this.filterBannerSiderbar(res.data);
          // console.log(JSON.stringify(_this.types));
          _this.$util.setSessionData(_this.$GLOBAL.SESSION_SIDEBAR_CATEGORISE, JSON.stringify(_this.types));
          console.log("_this.types...", _this.types);
      }
  });
}
</script>
```

- res 的数据结构就是

```json
{
  "data": [
    {
      "parent": "0",
      "level": "1",
      "longnumber": "APPCLASS-00000001",
      "name": "生产制造",
      "actionid": "",
      "id": "865260180810502144",
      "linkurl": ""
    },
    {
      "parent": "865260180810502144",
      "level": "2",
      "longnumber": "APPCLASS-00000001.APPCLASS-00000002",
      "name": "仿真工具",
      "actionid": "",
      "id": "865260270837043200",
      "linkurl": ""
    },

    {
      "parent": "865260270837043200",
      "level": "3",
      "longnumber": "APPCLASS-00000001.APPCLASS-00000002.APPCLASS-00000001",
      "name": "仿真工具01",
      "actionid": "",
      "id": "865260270837043200a",
      "linkurl": ""
    },

    {
      "parent": "865260270837043200",
      "level": "3",
      "longnumber": "APPCLASS-00000001.APPCLASS-00000002.APPCLASS-00000002",
      "name": "仿真工具02",
      "actionid": "",
      "id": "865260270837043200b",
      "linkurl": ""
    },
    {
      "parent": "865260270837043200",
      "level": "3",
      "longnumber": "APPCLASS-00000001.APPCLASS-00000002.APPCLASS-00000003",
      "name": "仿真工具03",
      "actionid": "",
      "id": "865260270837043200c",
      "linkurl": ""
    },
    {
      "parent": "865260270837043200",
      "level": "3",
      "longnumber": "APPCLASS-00000001.APPCLASS-00000002.APPCLASS-00000004",
      "name": "仿真工具04",
      "actionid": "",
      "id": "865260270837043200d",
      "linkurl": ""
    },
    {
      "parent": "865260270837043200",
      "level": "3",
      "longnumber": "APPCLASS-00000001.APPCLASS-00000002.APPCLASS-00000005",
      "name": "仿真工具05",
      "actionid": "",
      "id": "865260270837043200e",
      "linkurl": ""
    }
  ]
}
```

- 转换之后的\_this.types 的数据结构

```json
[
  {
    "name": "IT设备",
    "id": "886227321638387712",
    "itemid": "865139243800891392",
    "childList": [
      {
        "name": "IT数码",
        "id": "886227922187225088",
        "itemid": "865139243867999232",
        "parent": "886227321638387712",
        "subChildList": [
          {
            "name": "CD盒",
            "id": "886228661441693696",
            "itemid": "865139243868000256",
            "level": "3"
          }
        ],
        "level": "2"
      },
      {
        "name": "存储设备",
        "id": "886227922514380800",
        "itemid": "865139243943496706",
        "parent": "886227321638387712",
        "subChildList": [
          {
            "name": "MO磁光盘机",
            "id": "886229072105998336",
            "itemid": "865139243943497730",
            "level": "3"
          }
        ],
        "level": "2"
      }
    ],
    "level": "1"
  },
  {
    "name": "IT设备",
    "id": "886227321638387712",
    "itemid": "865139243800891392",
    "childList": [
      {
        "name": "IT数码",
        "id": "886227922187225088",
        "itemid": "865139243867999232",
        "parent": "886227321638387712",
        "subChildList": [
          {
            "name": "CD盒",
            "id": "886228661441693696",
            "itemid": "865139243868000256",
            "level": "3"
          }
        ],
        "level": "2"
      },
      {
        "name": "存储设备",
        "id": "886227922514380800",
        "itemid": "865139243943496706",
        "parent": "886227321638387712",
        "subChildList": [
          {
            "name": "MO磁光盘机",
            "id": "886229072105998336",
            "itemid": "865139243943497730",
            "level": "3"
          }
        ],
        "level": "2"
      }
    ],
    "level": "1"
  }
]
```
