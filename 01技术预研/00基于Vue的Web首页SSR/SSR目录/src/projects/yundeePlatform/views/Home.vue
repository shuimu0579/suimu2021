<template>
  <div class="container">
    <Header
      :class="topBannerAble ? 'topBannerAble' : 'header'"
      :tplId="tplId"
      :menuArrProp="menuArr"
      :navArrProp="navArr"
      :curSelectProp="curSelect"
    ></Header>
    <DemandComponent
      title="行业需求"
      :moduleDemandNavItems="module_3_navItems"
      :moduleDemandData="module_3_data"
      :moduleDemandImg="module_3_Img"
    ></DemandComponent>
    <SupplyComponent
      title="行业货源"
      :moduleSupplyNavItems="module_2_navItems"
      :moduleSupplyData="module_2_data"
      :moduleSupplyImg="module_2_Img"
    ></SupplyComponent>

    <!--<ul class="bg" :style="{ height: totalHeight + 'px' }">
            <li
                :modelTypeImg="modelTypeImg"
                :modulesettingList="modulesettingList"
                :title="item.modulename"
                :moduletitlealign="item.titlealign"
                :is="item.component"
                v-for="(item, $index) in curComponent"
                :key="$index"
                :preData="item.preData"
                :moduleData="item"
            />
        </ul>
    -->
    <!-- <Footer></Footer> -->
    <!-- <SolutionYC></SolutionYC> -->
  </div>
</template>

<script>
// import { util } from "../../../utils/util.js";
// import GLOBAL from "../../../utils/constant";
import cookieHelper from '../../../utils/cookies.js'
import request from '../../../utils/request'
import domConfig from '../../../utils/domConfig'
const Header = () => import('../../../components/layout/Header')
const DemandComponent = () => import('../../../components/home/DemandComponent')
const SupplyComponent = () => import('../../../components/home/SupplyComponent')

// const Footer = () => import("../../../components/layout/Footer");
// const SolutionYC = () => import("../../../components/home/SolutionYC");

let componentList = []
export default {
  name: 'home',
  // 添加以下代码
  metaInfo() {
    const title = '云镝工业互联网平台'
    return {
      title,
      meta: [
        { name: 'description', content: title },
        { name: 'keywords', content: title },
      ],
    }
  },
  asyncData({ store }) {
    // 触发 action 后，会返回 Promise
    var p1 = store.dispatch('headModule/getMenu')
    var p2 = store.dispatch('headModule/getDemandCategories')
    var p3 = store.dispatch('headModule/getSupplyCategories')
    return Promise.all([p1, p2, p3]).then(values => {
      console.log(values)
    })
  },
  components: {
    Header,
    DemandComponent,
    SupplyComponent,
    // Footer,
    // SolutionYC,
  },
  data() {
    return {
      modulesettingList: [],
      modelTypeImg: {}, //各模块背景图
      componentItems: [], //所需加载模块
      lazyData: [], //懒加载的模块
      lazyHeight: 0, //当前数据所加载的高度
      totalHeight: 0, //所需加载模块的总高度
      lazyIndex: 0, //当前模块的个数  从0开始
      topBannerAble: false,
      tplId:
        typeof sessionStorage === 'object' && sessionStorage.getItem('tplId')
          ? typeof sessionStorage === 'object' &&
            sessionStorage.getItem('tplId')
          : '1',
      isLogin: cookieHelper.isLogin(),
      isyc: false,
      isSecondModel: false,
    }
  },

  created() {
    const _this = this
    if (
      this.cq_config.platformid.indexOf('yc') > -1 ||
      this.cq_config.platformid.indexOf('wcjkq') > -1 ||
      this.cq_config.platformid.indexOf('tcgy') > -1 ||
      this.cq_config.platformid.indexOf('yy') > -1 ||
      this.cq_config.platformid.indexOf('wzra') > -1
    ) {
      _this.isyc = true
      // console.log("......._this.isyc", _this.isyc);
    }
    //个人工作台快捷方式
    // if (this.$route.query.centerUrl) {
    //     const _this = this;
    //     if (!_this.isLogin) {
    //         let str = _this.$route.query.centerUrl;
    //         let pageUrl = util.parseUrl(str, GLOBAL.urlJoinIdentifier);
    //         const url =
    //             this.cq_config.yundee_center_login_url + "login?vtenant=" + this.cq_config.platformid + "&service=" + pageUrl;
    //         window.location.href = url;
    //     } else {
    //         window.location.href = _this.$route.query.centerUrl;
    //     }
    // }

    // 首页配置化
    let HOME_SETTING_Data = {
      method: _this.isyc ? 'modulesetting' : 'moduleSetting',
      platformid: this.cq_config.platformid,
    }
    const _url = _this.isyc
      ? this.$GLOBAL.DESIGN_YC_TEMPLATE
      : this.$GLOBAL.HOME_BANNER
    // 逻辑修改为  先取是否有模板  没有按原有逻辑走  有则按模板走
    request
      .get(
        this.cq_config.yundee_center_url +
          _this.$GLOBAL.DESIGN_V_TEMPLATE +
          this.cq_config.platformid,
        {
          withCredentials: false,
        }
      )
      .then(res => {
        if (res.success && res.data) {
          // console.log(".......res", res);
          const arr = []
          const compData = JSON.parse(res.data.content)

          compData.forEach(item => {
            if (item.isShow === 1 || item.isShow === undefined) {
              if (item.component.toString().toLowerCase() === 'header') {
                _this.tplId = item.v ? item.v.toString() : '1'
                if (typeof sessionStorage === 'object')
                  sessionStorage.setItem('tplId', _this.tplId)
              }
              if (item.component.toString().toLowerCase() !== 'header') {
                item.modulename = item.title
                item.titlealign = item.moduletitlealign

                let component = item.component.toString()
                let preData = {}
                for (let componentName in _this.$presetData) {
                  if (component === componentName) {
                    preData = _this.$presetData[componentName]
                  }
                }
                item.preData = preData
                arr.push(item)
                if (
                  item.component.toString().toLowerCase() === 'footer' &&
                  item.type === 1
                ) {
                  this.totalHeight += 160
                  return false
                }
                this.totalHeight += parseInt(
                  domConfig[item.component].height,
                  10
                )
              }
            }
          })
          _this.initComponent(arr)
        } else {
          request.post(_url, HOME_SETTING_Data).then(res => {
            if (res.success) {
              this.modulesettingList = res.data.list
              // console.log("....modulesettingList", this.modulesettingList)
              const arr = []
              res.data &&
                res.data.list.forEach(item => {
                  if (item.enablemodule) {
                    if (item.component === 'TopBanner')
                      this.topBannerAble = true
                    arr.push({
                      component: item.component,
                      modulename: item.modulename,
                      titlealign: item.titlealign,
                    })
                    if (
                      item.component.toString().toLowerCase() === 'footer' &&
                      item.type === 1
                    ) {
                      this.totalHeight += 160
                      return false
                    }
                    this.totalHeight += parseInt(
                      domConfig[item.component].height,
                      10
                    )
                  }
                })
              _this.initComponent(arr)
            }
            if (typeof sessionStorage === 'object')
              sessionStorage.setItem('tplId', '1')
          })
        }
      })
  },

  // 重要信息：当多次访问路由时，
  // 避免在客户端重复注册模块。
  computed: {
    // Header
    menuArr() {
      const { menuArr } = this.$store.state.headModule
      return menuArr
    },
    navArr() {
      const { navArr } = this.$store.state.headModule
      return navArr
    },
    curSelect() {
      const { curSelect } = this.$store.state.headModule
      return this.$util.UTF8Decoding(curSelect)
    },

    // DemandComponent
    module_3_navItems() {
      const { module_3_navItems } = this.$store.state.headModule
      return module_3_navItems
    },
    module_3_data() {
      const { module_3_data } = this.$store.state.headModule
      return module_3_data
    },
    module_3_Img() {
      const { module_3_Img } = this.$store.state.headModule
      return module_3_Img
    },

    // SupplyComponent
    module_2_navItems() {
      const { module_2_navItems } = this.$store.state.headModule
      return module_2_navItems
    },
    module_2_data() {
      const { module_2_data } = this.$store.state.headModule
      return module_2_data
    },
    module_2_Img() {
      const { module_2_Img } = this.$store.state.headModule
      return module_2_Img
    },

    curComponent() {
      if (this.lazyData && this.lazyData.length > 0) {
        for (let key in this.lazyData) {
          let a = this.lazyData[key]
          if (componentList[key]) continue

          let obj = {
            component: '',
            modulename: '',
            titlealign: '',
            data: a,
            preData: a.preData ? a.preData : {},
          }

          if (a && a.component.toString().toLowerCase() === 'footer') {
            obj.component = () => import('../../../components/layout/Footer')
          } else {
            obj.component = () => import(`@/components/home/${a.component}`)
          }

          obj.modulename = a.modulename
          obj.titlealign = a.titlealign
          componentList.push(obj)
        }
      }
      return componentList
    },
  },
  methods: {
    getIndexTypeList() {
      let _this = this
      let data = {
        method: 'getmodeltype',
        platformid: this.cq_config.platformid,
        // type: [],
        // moduleid: [],
      }
      request.post(_this.$GLOBAL.DESIGN_YC_TEMPLATE, data).then(res => {
        if (res.success) {
          this.modelTypeImg = res.data.datalist
          // console.log("....modelTypeImg", this.modelTypeImg)
        }
      })
    },

    initComponent(arr) {
      // this.totalHeight += 50; // 最底部间隔增加50px
      const clientHeight =
        typeof document === 'object' && document.documentElement.clientHeight // 当前分辨率下可视区域
      let height = 155 // 头部菜单高度
      const lazyDataFirstView = []
      let lazyDataFirstIndex = 0
      if (arr.length > 0) {
        arr.forEach((item, $index) => {
          if (!domConfig[item.component].zIndex) {
            height += parseInt(domConfig[item.component].height, 10)
          }
          if (height < clientHeight) {
            lazyDataFirstView.push(item)
            lazyDataFirstIndex = $index
          }
        })
        // 多加载可视区域模块后的一个模块
        if (lazyDataFirstView.length === 0) {
          lazyDataFirstView.push(arr[lazyDataFirstIndex])
          this.lazyIndex = lazyDataFirstIndex
        } else {
          lazyDataFirstView.push(arr[lazyDataFirstIndex + 1])
          this.lazyIndex = lazyDataFirstIndex + 1
        }
      }

      this.lazyData = lazyDataFirstView
      this.componentItems = arr
    },
  },

  mounted() {
    const _this = this
    if (typeof window === 'object')
      window.addEventListener('scroll', function() {
        // 兼容性问题
        const scrollTop =
          (typeof document === 'object' &&
            document.documentElement.scrollTop) ||
          (typeof document === 'object' && document.body.scrollTop) // 滚动高度
        if (scrollTop > _this.lazyHeight) {
          _this.componentItems.forEach((item, $index) => {
            if (
              $index > _this.lazyIndex &&
              scrollTop > _this.lazyHeight &&
              _this.lazyData.length < _this.componentItems.length
            ) {
              _this.lazyHeight += parseInt(domConfig[item.component].height, 10)

              _this.lazyIndex = $index
              _this.lazyData.push(item)
            }
          })
        }
      })
  },
  beforeDestroy() {
    componentList = []
  },
}
</script>

<style scoped>
.topBannerAble {
  background: transparent !important;
  z-index: 999 !important;
  position: absolute !important;
  box-shadow: none !important;
}
.header {
  position: relative;
}
.bg {
  width: 100%;
  height: 100%;
  min-height: 880px;
  background: rgba(246, 248, 250, 1);
  /*padding-bottom: 50px;*/
  /* background-color: transparent; */

  z-index: -1;
}
</style>
