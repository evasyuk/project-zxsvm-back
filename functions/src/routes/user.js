import { MyRouter } from '../helper/router'
import { GetMe } from '../actions/user'

const router = new MyRouter()

router.get("/v1/user/me", GetMe, { authEnabled: true })

export default router
