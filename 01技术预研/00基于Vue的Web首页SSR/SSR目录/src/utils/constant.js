const cq_config = require('../../public/Config')
const GLOBAL = {
  USER_COOKIE_KEY: 'KERPSESSIONID',
  USER_COOKIE_TENANTID_KEY: 'KERPSESSIONID' + cq_config.tenantid,
  USER_COOKIE_TICKET: cq_config.platformid + 'ticket',
  APP_CENTER: cq_config.enterpriseurl + 'kapi/app/amkopr/getapp',
  MARKET_CENTER: cq_config.enterpriseurl + 'kapi/app/iecbd/goods',
  IECSAL_SUPPLY_INDEX:
    cq_config.enterpriseurl + 'kapi/app/iecsal/iecsal_supply_indexshow',
  RESERVE_INFO: cq_config.enterpriseurl + 'kapi/app/icpf/getAnonymousApi', //信息收集接口
  USER_LOGOUT: cq_config.yundee_center_url + '/rest/logout', //用户退出登录
}
export default GLOBAL
