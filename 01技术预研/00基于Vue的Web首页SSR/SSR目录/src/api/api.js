import GLOBAL from '@/utils/constant' //文件路径
import service from '@/utils/request'
import cookies from '@/utils/cookies'
import axios from 'axios'
import { util } from '@/utils/util'
const cq_config = require('../../public/Config')

// 验证登录是否有效

export const getIsValidLogin = () => {
  const indexData = {
    ticket: cookies.getCookieData(cq_config.platformid + 'ticket'),
    vtenant: cq_config.platformid,
    type: 0,
  }
  return axios.post(
    cq_config.yundee_center_url + '/rest/check',
    JSON.stringify(indexData),
    {
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        traceId: util.setUuid(),
      },
    }
  )
}
