import { MyRouter } from '../helper/router'
import { Ping } from '../actions/hello'

const router = new MyRouter()

router.get("/v1/ping", Ping)

export default router
