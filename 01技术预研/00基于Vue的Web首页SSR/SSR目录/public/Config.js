const config = {
  url: 'http://localhost:8888', //IIC接口地址
  platform: 'http://api.kingdee.com/', //正式環境云平台中心,
  // enterpriseurl: "/ierp/", //企业中心url
  enterpriseurl: '/yundeetest5/', //企业中心url
  tenantid: 'yundeetest5', // 租户id
  // tenantid: "next", // 租户id
  // platformid: '0', // 应用市场ID或虚拟租户ID
  // platformid: 'testvt01', // 应用市场ID或虚拟租户ID
  // platformid: "yy", // 应用市场ID或虚拟租户ID
  // platformid: "dev", // 应用市场ID或虚拟租户ID
  platformid: 'yundee', // 应用市场ID或虚拟租户ID
  picture_url: 'http://172.17.53.126/fileserver/', //图片服务器
  baseURL: '', //二级域名
  yundee_ssr_baseURL: 'http://172.17.53.126/',
  yundee_center_url: 'http://172.17.53.124:8880', //统一认证请求地址
  // yundee_center_url: "http://172.19.79.82:8880", //liweitao
  // yundee_center_url: "http://172.19.75.118:8880", // liuguiyao
  // yundee_center_login_url: "http://172.19.77.41:8082/cas/", //统一认证登录地址
  yundee_center_login_url: 'http://172.17.53.124/cas/', //统一认证登录地址
}

module.exports = config
