import { MyRouter } from '../helper/router'
import { UserLogin, UserRegister } from '../actions'

const router = new MyRouter()

router.post("/session/login", UserLogin)
router.post("/session/register", UserRegister)

export default router
