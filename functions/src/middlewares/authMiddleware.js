import ContextHelper from "../helper/ContextHelper";
import TokenHelper from "../helper/TokenHelper";
import FirestoreHelper from "../helper/FirestoreHelper";

TokenHelper.decodeToken()

const processToken = (ctx) => {
  let success = false
  let decodedPayload = null
  let message = null
  
  let { authorization } = ctx.request.header

  if (authorization.startsWith('Bearer ')) {
    authorization = authorization.substr(7)
  }

  try {
    const decodeResult = TokenHelper.decodeToken(authorization)
    success = decodeResult.success
    decodedPayload = decodeResult.decodedPayload
    message = 'AUTH.WRONG_TOKEN' // message = decodeResult.message
  } catch (ignore) { // TODO: how system behave on token expiration?
    message = ignore.message // TODO: 'AUTH.WRONG_TOKEN'
  }

  return {
    success,
    decodedPayload,
    message,
  }
}

export default async function(ctx, next) {
  let tokenDecodeSummary
  let userRecord
  try {
    tokenDecodeSummary = await processToken(ctx)

    if (tokenDecodeSummary.success) {
      const operationResult = await FirestoreHelper.getUserByEmail({
        fireadmin: ctx.fireadmin,
        email: tokenDecodeSummary.decodedPayload.email
      })

      if (operationResult.success) {
        ctx.state.userRecord = operationResult.userRecord
      } else {
        return ContextHelper.error(ctx, operationResult.message, 500)
      }
    } else {
      return ContextHelper.error(ctx, tokenDecodeSummary.message, 401)
    }
  } catch (error) {
    return ContextHelper.error(ctx, error.message, 401)
  }

  return next()
}
