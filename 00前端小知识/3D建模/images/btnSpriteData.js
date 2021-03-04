import cookieHelper from '../../../../utils/cookies.js'
import { util } from '../../../../utils/util.js'
import globle from '../../../../utils/constant'
const cq_config = require('cq_config')
const trace = util.setUuid()

export default [
  {
    name: 'test01',
    url: require('../images/experienceCenterBy3D/test01.png'),
    link: 'https://demo.yundeeiot.com/',
    position: {
      x: -1.0,
      y: 0.3,
      z: 0.1,
    },
    scale: {
      scalex: 0.32,
      scaley: 0.08,
      scalez: 0.1,
    },
  },
]
