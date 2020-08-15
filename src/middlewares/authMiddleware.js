import { CookieHelper } from "../helper/SessionHelper";
import ContextHelper from "../helper/ContextHelper";

const setUser = async (ctx, decodedPayload)  => {
    ctx.state.user = {
        user_id: decodedPayload.user.user_id,
    }
}

export default async (ctx, next) => {
    const decodeResult = await CookieHelper.cookieGetToken(ctx)

    if (decodeResult.isError) {
        ContextHelper.error(ctx, decodeResult.errorMessage, 401)
    } else {
        await setUser(ctx, decodeResult.decodedPayload)
    }

    return next()
}
