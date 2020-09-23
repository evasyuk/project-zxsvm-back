import { MyRouter } from '../helper/router'
import { UserLogin, UserRegister } from '../actions'

const router = new MyRouter()

router.post("/v1/session/login", UserLogin)
router.post("/v1/session/register", UserRegister)

export default router
