import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

import { createStore } from './store'
import { sync } from 'vuex-router-sync'
// 服务端渲染时, 将首页所有组件打包

import Empty from '../../components/Empty/Empty.vue'
import Header from '../../components/layout/Header.vue'

import UserDialog from '../../components/dialog/UserDialog.vue'
import TipsDefault from '../../components/tips/TipsDefault.vue'
// TODO 下面这几个组件 都应该改为首字母大写
import recommendWeb from '../../components/dropdown/recommendWeb.vue'
import cloudMap from '../../components/dropdown/cloudMap.vue'
import enterpriseApp from '../../components/dropdown/enterpriseApp.vue'
import HeaderImgList from '../../components/list/HeaderImgList.vue'

import workBench from '../../components/dropdown/workBench.vue'
import publicApp from '../../components/dropdown/publicApp.vue'
import otherPlatForm from '../../components/dropdown/otherPlatForm.vue'
import operCenter from '../../components/dropdown/operCenter.vue'
import List from '../../components/dropdown/List.vue'
import Tree from '../../components/dropdown/Tree.vue'
import ImgTree from '../../components/dropdown/ImgTree.vue'

import DemandComponent from '../../components/home/DemandComponent.vue'
import BaseTabComponent from '../../components/tab/BaseTabComponent.vue'
import DemandListComponent from '../../components/list/DemandListComponent.vue'
import Slogan from '../../components/banner/Slogan.vue'
import DemandRecomandList from '../../components/list/DemandRecomandList.vue'
import SupplyComponent from '../../components/home/SupplyComponent.vue'
import SupplyListComponent from '../../components/list/SupplyListComponent.vue'

import CommonDialog from '../../components/dialog/CommonDialog.vue'
import Footer from '../../components/layout/Footer.vue'
import ProductSupplyCard from '../../components/home/ProductSupplyCard.vue'
import ProductLeft from '../../components/home/ProductLeft.vue'
import ProductRight from '../../components/home/ProductRight.vue'
import HaveATryYC from '../../components/home/HaveATryYC.vue'

// 服务端渲染时, 路由页面打包
import Index from './views/Index.vue'
import ContactUs from './views/ContactUs.vue'
import SupplyChain from './views/platformProducts/SupplyChain.vue'

import Home from './views/Home.vue'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'swiper/css/swiper.css'
import {
  Row,
  Pagination,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  Option,
  Button,
  Carousel,
  Upload,
  CarouselItem,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Tag,
  InputNumber,
  Radio,
  Dialog,
  Main,
  Message,
  Menu,
  Submenu,
  MenuItem,
  Form,
  FormItem,
  Autocomplete,
  Popover,
  Step,
  Steps,
  MessageBox,
  Tooltip,
  Divider,
  DatePicker,
  RadioGroup,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import globalVariable from '../../utils/constant'
import { util } from '../../utils/util'
import presetData from '../../utils/presetData'

const cq_config = require('../../../public/Config')
import globalConfig from '../../api/globalConfig'

Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Autocomplete)
Vue.use(Row)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(InputNumber)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Upload)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Radio)
Vue.use(Dialog)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Tooltip)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(RadioGroup)
// Vue.use(MessageBox);

Vue.prototype.$message = Message

let globalConf = new globalConfig()
Vue.prototype.$globalConfig = globalConf
// 非父子组件通信的公共汽车
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
Vue.config.devtools = true

// console.log('cq_config', cq_config)
Vue.prototype.cq_config = cq_config
Vue.prototype.$GLOBAL = globalVariable
Vue.prototype.$util = util

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm

Vue.prototype.$presetData = presetData

export function createApp() {
  const router = createRouter()
  const store = createStore()

  // 同步路由状态(route state)到 store
  sync(store, router)

  const app = new Vue({
    components: {
      Empty,
      Index,
      ContactUs,
      recommendWeb,
      cloudMap,
      enterpriseApp,
      workBench,
      publicApp,
      operCenter,
      otherPlatForm,
      UserDialog,
      TipsDefault,
      Tree,
      ImgTree,
      List,
      HeaderImgList,
      Header,
      DemandListComponent,
      BaseTabComponent,
      Slogan,
      DemandRecomandList,
      DemandComponent,
      SupplyListComponent,
      SupplyComponent,

      CommonDialog,
      ProductSupplyCard,
      ProductLeft,
      ProductRight,
      HaveATryYC,
      Footer,

      SupplyChain,
      Home,
    },
    router,
    store,
    render: h => h(App),
  })
  return { app, router, store }
}
