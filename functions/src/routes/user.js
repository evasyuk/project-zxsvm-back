import { MyRouter } from '../helper/router'
import { GetMe, ChangePassword } from '../actions/user'

const router = new MyRouter()

router.get("/v1/user/me", GetMe, { authEnabled: true })
router.post("/v1/user/password/change", ChangePassword, { authEnabled: true })

export default router
