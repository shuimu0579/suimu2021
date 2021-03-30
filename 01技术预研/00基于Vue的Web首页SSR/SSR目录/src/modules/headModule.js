import request from '../utils/request.js'
import cookieHelper from '../utils/cookies.js'
const cq_config = require('../../public/Config.js')
import { util } from '../utils/util.js'
import GLOBAL from '../utils/constant.js'

const headModule = {
  namespaced: true,
  state: () => ({
    menuArr: [],
    navArr: [],
    curSelect: '/',

    module_3_navItems: [],
    module_3_Img: [],
    module_3_data: [],

    module_2_navItems: [],
    module_2_Img: [],
    module_2_data: [],
  }),
  actions: {
    getMenu(context) {
      let casTicket = cookieHelper.getCookieData(
        cq_config.platformid + 'ticket'
      )
      let data = {
        vtenant: cq_config.platformid,
        casTicket,
      }
      return request
        .post(
          cq_config.yundee_center_url + '/navigation/menu/list/v2',
          JSON.stringify(data),
          {
            withCredentials: false,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(res => {
          if (res.success) {
            if (res.data.menuitem && res.data.menuitem.length > 0) {
              context.commit(
                'setMenuArray',
                util.translateDataToTree(res.data.menuitem)
              )
            }
            if (res.data.navitem && res.data.navitem.length > 0) {
              context.commit(
                'navArr',
                util.translateDataToTree(res.data.navitem)
              )
            }
            context.commit('curSelect', util.UTF8Encoding('/'))
          }
        })
    },

    getDemandCategories(context) {
      let HOME_DEMAND_RECOMMEND = {
        method: 'getcategories',
        platformid: cq_config.platformid,
      }
      return request
        .post(
          cq_config.yundee_ssr_baseURL + GLOBAL.USER_DEMAND_LIST,
          HOME_DEMAND_RECOMMEND
        )
        .then(res => {
          if (res.success) {
            util.setSessionData(
              GLOBAL.SESSION_DEMAND_CATEGORISE,
              JSON.stringify(res.data)
            )

            const module_3_navItems = res.data.map((item, index) => {
              return {
                name: item.name,
                id: `${index + 1}`,
                demandIndustryID: item.id,
              }
            })
            const { id } = res.data[0] //取第一个为默认的行业
            context.commit('module_3_navItems', module_3_navItems)

            console.log('actions  industryID...', id)
            // 门户首页--行业需求--获取主图和六个推荐
            let HOME_DEMAND_CATEGORY = {
              method: 'getrecommendbycategoryid',
              platformid: cq_config.platformid,
              industryid: id,
            }

            return request
              .post(
                cq_config.yundee_ssr_baseURL + GLOBAL.USER_DEMAND_LIST,
                HOME_DEMAND_CATEGORY
              )
              .then(res => {
                if (res.success) {
                  const arr = []
                  arr.push(res.data.url)
                  let module_3_data = res.data.recommend.map((item, index) => {
                    return {
                      title: item.enterprisename,
                      des: item.billtitle,
                      num: item.productcount,
                      date: item.quotationdeadline,
                      quotationcount: item.quotationcount,
                      id: item.id,
                      index: index,
                    }
                  })
                  context.commit('module_3_Img', arr)
                  context.commit('module_3_data', module_3_data)
                }
              })
          }
        })
    },
    getSupplyCategories(context) {
      //货源
      const SUPPLY_INDEX_Data = {
        method: 'getiecsalindexlist',
        categoryid: '',
        pageindex: '0',
        pagesize: '6',
        platformid: cq_config.platformid,
      }
      return request
        .post(
          cq_config.yundee_ssr_baseURL + GLOBAL.USER_SUPPLY_LIST,
          SUPPLY_INDEX_Data
        )
        .then(res => {
          if (res.success) {
            let module_2_navItems = res.data.categoryarray.map(
              (item, index) => {
                return {
                  name: item.name,
                  id: `${index + 1}`,
                  categoryId: item.id,
                }
              }
            )
            context.commit('module_2_navItems', module_2_navItems)

            let module_2_Img = [cq_config.picture_url + res.data.images]
            context.commit('module_2_Img', module_2_Img)

            let arr = res.data.rows.map((item, index) => {
              return {
                id: item.productid,
                imgSrc: cq_config.picture_url + item.picUrl,
                price: item.price,
                title: item.title,
                des: item.enterprisename,
                index: index + 1,
                tenantid: item.tenantid,
                redirecturl: item.redirecturl,
              }
            })
            context.commit('module_2_data', arr)
          }
        })
    },
  },
  mutations: {
    setMenuArray(state, item) {
      state.menuArr = item
    },
    navArr(state, item) {
      state.navArr = item
    },
    curSelect(state, item) {
      state.curSelect = item
    },

    module_3_navItems(state, item) {
      state.module_3_navItems = item
    },
    module_3_Img(state, item) {
      console.log('mutations module_3_Img...', item)
      state.module_3_Img = item
    },
    module_3_data(state, item) {
      state.module_3_data = item
    },

    module_2_navItems(state, item) {
      state.module_2_navItems = item
    },
    module_2_Img(state, item) {
      state.module_2_Img = item
    },
    module_2_data(state, item) {
      state.module_2_data = item
    },
  },
}
export default headModule
