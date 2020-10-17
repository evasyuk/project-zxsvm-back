import { MyRouter } from '../helper/router'
import { GetMe, ChangePassword, DeleteMe, UpdateAvatarPicture, DeleteAvatarPicture } from '../actions/user'

const router = new MyRouter()

router.get("/v1/user/me", GetMe, { authEnabled: true })
router.delete("/v1/user/me", DeleteMe, { authEnabled: true })
router.post("/v1/user/password/change", ChangePassword, { authEnabled: true })

router.post("/v1/user/picture", UpdateAvatarPicture, { authEnabled: true })
router.delete("/v1/user/picture", DeleteAvatarPicture, { authEnabled: true })

export default router
