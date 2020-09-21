import { MyRouter } from '../helper/router'
import { Ping } from '../actions/hello'

const router = new MyRouter()

router.get("/ping", Ping)

export default router
