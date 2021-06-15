const util = require("./http.js")
const app = getApp();
export const i_getEntUrl = function (data) {
  if (!data) {
    data = {}
  }
  return util.requestUrl('/cascenter/get/enterprise/tenant/info/list', data)
}


//今日待检
export const login = function (data) {
  if (!data) {
    data = {
      "username": "",
      "password": ""
    };
  }
  return util.requestUrl('/sso/login', data)
}
//
export const loginByAccessToken = function () {

  return util.requestUrl('/sso/loginByAccessToken', {})
}
export const getUserInfoByAccessToken = function () {

  return util.requestUrl('/sso/getUserInfoByAccessToken', {
    accessToken: wx.getStorageSync('accessToken')
  })
}
//今日待检
export const queryToDayXjData = function (data) {
  if (!data) {
    data = {};
  }
  data["method"] = "queryToDayXjData"
  return util.requestUrl('/deviceXj/' + getApp().globalData.apiUri, data)
}
//历史待检
export const queryHistoryXjData = function (data) {
  if (!data) {
    data = {};
  }
  data["method"] = "queryHistoryXjData"
  return util.requestUrl('/deviceXj/' + getApp().globalData.apiUri, data)
}
//根据id查询详情
export const queryXjDetailById = function (data) {
  if (!data) {
    data = {};
  }
  data["method"] = "queryXjDetailById"
  return util.requestUrl('/deviceXj/' + getApp().globalData.apiUri, data)
}
//巡检记录
export const saveXjDetailById = function (data) {
  if (!data) {
    data = {};
  }
  data["method"] = "saveXjDetailById"
  return util.requestUrl('/deviceXj/' + getApp().globalData.apiUri, data)
}
//绑定微信用户
export const bindWechatUser = function (data) {
  if (!data) {
    data = {};
  }
  data["method"] = "bindWechatUser";
  return util.requestUrl('/deviceXj/' + getApp().globalData.apiUri, data)
}

//by lmk

//获取用户手机号
export const getPhoneNumber = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/wechat/applet/auth', data)
}
//根据code去登录
export const LoginbyCode = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/wx/login/byCode', data)
}


//获取用户信息
export const getUserInfo = function (data) {
  if (!data) {
    data = {};
  }

  return util.requestUrl('/cascenter/rest/get/user/info', data)
}

//获取企业信息
export const getEnterprise = function (data) {
  if (!data) {
    data = {};
  }

  return util.requestUrl('/cascenter/rest/get/wx/all/enterprise/list/by/user', data)
}

//切换企业
export const changeEnt = function (data) {
  if (!data) {
    data = {};
  }

  return util.requestUrl(app.globalData.platformId + 'ierp/kapi/app/base/switchDefaultEnterprise', data)
}

//模糊搜索企业
export const searchByName = function (data) {
  if (!data) {
    data = {};
  }

  return util.requestUrl('/cascenter/rest/get/vtenant/enterprise/list/by/name', data)
}

//获取全量菜单
export const getWxMenu = function (data) {
  if (!data) {
    data = {};
  }

  return util.requestUrl('/cascenter/wx/get/wxmenu', data)
}

//获取应用跳转url
export const getAppUrl = function (data) {
  if (!data) {
    data = {};
  }

  return util.requestUrl('/cascenter/wx/get/menu/url', data)
}

//获取用户个人菜单
export const getUserMenu = function (data) {
  if (!data) {
    data = {};
  }

  return util.requestUrl('/cascenter/wx/get/usermenu', data)
}

//申请加入企业
export const applyAddEnterprise = function (data) {
  if (!data) {
    data = {};
  }
  data["method"] = "applyAddEnterprise"
  return util.requestUrl(app.globalData.platformId + 'kapi/app/icpf/getPortalApi', data)
}
//保存应用
export const saveApp = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/wx/updateUserMenu', data)
}

//账号密码登录
export const loginWithAccount = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/rest/login', data)
}

//企查查模糊查询
export const SearchEntByName = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/rest/SearchEntByName', data)
}

//校验企业是否存在
export const existEnt = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/rest/enterprise/is/exist', data)
}

//创建企业	
export const creatEnt = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/rest/create/enterprise', data)
}

//商机录入
export const bussiness = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/wx/save/user/bussiness', data)
}

//判断是否有在审核的企业
export const applyFrom = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/rest/get/any/applyFrom', data)
}

//是否存在商机
export const exitBussiness = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/wx/bussiness/exit', data)
}
//获取openid
export const getOpenId = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/generate/code/4/appplet', data, null, 'get')
}
//公众号接受信息开关
export const messageSwitch = function (data) {
  if (!data) {
    data = {};
  }
  return util.requestUrl('/cascenter/switch/user/get/yundee/message', data)
}
