import cors from "@koa/cors"

import { URI } from '../helper/AppConfigHelper'

const headers = ['authorization', 'accept', 'content-type']

export default cors({
  origin: (ctx) => {
    const origin = ctx.get('Origin')
    let temp = '*'
    if (origin === URI || origin.startsWith('http://localhost')) {
      temp = origin
    }
    return temp
  },
  exposeHeaders: headers,
  allowHeaders: headers,
  credentials: true,
})
