import Exe from '../../helper/router/Exe';
import FireAuthHelper from '../../helper/FireAuthHelper'

class ChangePassword extends Exe {
  static validationRules = {
    password: ['required', 'string'],
    uid: ['required', 'string'],
    email: ['required', 'string'],
  }

  static paramsBuilder = (ctx) => ({
    email: ctx.state.userRecord.email,
    uid: ctx.state.user.uid,
    password: ctx.req?.body?.password,
  })

  static contextBuilder = (ctx) => ({
    fireadmin: ctx.fireadmin,
  })

  async execute({ email, uid, password }) {
    const [success, message] = await this.changePassword(email, uid, password)

    if (success) {
      return {
        data: {}
      }
    } else {
     return {
       data: {
         message,
       },
       code: 500,
     }
    }
  }

  async changePassword(email, uid, password) {
    const {
      success,
      message = ':/',
    } = await FireAuthHelper.changePassword(this.context.fireadmin, { email, uid }, password)
    return [success, message]
  }
}

export default ChangePassword
