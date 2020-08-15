import Exe from '../../helper/router/Exe'
import { RepoUser } from "../../repository";
import { UserNotFound } from "../../error";

class UserGet extends Exe {
    static contextBuilder = (ctx) => ({
        user: ctx.state.user,
    })

    async execute() {
        const users = await RepoUser.getUserById(this.context.user.user_id)
        if (!users.length) {
            throw new UserNotFound()
        }

        const user = users[0]

        return {
            data: {
                user,
            },
        }
    }
}

export default UserGet
