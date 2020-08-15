import { MyRouter } from '../helper/router'
import { UserGet } from '../actions'

const router = new MyRouter()

router.get("/user/me", UserGet, { authEnabled: true })

export default router
