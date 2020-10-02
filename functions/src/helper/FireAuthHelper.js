import TokenHelper from "./TokenHelper";

class FireAuthHelper {
  static async login({ fireadmin, email, password }) {
    let success = false
    let message = null
    let token = null

    try {
      const result = await FireAuthHelper._verifyPassword(fireadmin, email, password)
      if (result.success) {
        token = FireAuthHelper._getToken({ email, uid: result.userMeta.uid })
        success = true
      } else {
        message = result.message
      }
    } catch (err) {
      message = err.message
    }

    return {
      success,
      token,
      message,
    }
  }

  static async register({ fireadmin, email, phone, displayName, password }) {
    let success = true
    let token = null
    let message = null

    try {
      const userRecord = await fireadmin.auth().createUser({
        email,
        emailVerified: false,
        phoneNumber: phone,
        password,
        displayName,
        // photoURL: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
        disabled: false
      })

      try {
        // firebase auth throws error if account already exists
        const passwordHash = TokenHelper.generateHash(password)
        await FireAuthHelper._savePassword(fireadmin, email, passwordHash, userRecord.uid)

        token = FireAuthHelper._getToken({ email, uid: userRecord.uid })
      } catch (err) {

        success = false
        message = err.message
      }
    } catch (error) {
      success = false
      if (error?.code === 'auth/invalid-phone-number') {
        message = error.message // 'The phone number must be a non-empty E.164 standard compliant identifier string.'
      } else {
        message = 'AUTH.EMAIL_ALREADY_IN_USE'
      }
    }

    return {
      success,
      token,
      message,
    }
  }

  static _getToken({ email, uid }) {
    return TokenHelper.generateToken({
      email,
      uid,
    })
  }

  static async _savePassword(fireadmin, email, passwordHash, uid) {
    return fireadmin.firestore().collection('userHelper')
      .doc(email)
      .set({
        pHash: passwordHash,
        uid,
      })
  }

  static async _verifyPassword(fireadmin, email, password) {
    let success = false
    let userMeta = null
    let message = null

    try {
      const snapshot = await fireadmin.firestore().collection('userHelper').doc(email).get()
      userMeta = snapshot.data()
      // console.log('snapshot', snapshot)
      // console.log('userMeta', userMeta)

      if (userMeta) {
        success = await TokenHelper.comparePassword(password, userMeta.pHash)
        if (success) {
          delete userMeta.pHash
        } else {
          message = 'AUTH.WRONG_PASSWORD'
        }
      } else {
        message = 'AUTH.NOT_FOUND'
      }
    } catch (err) {
      console.log('unexpected error at _verifyPassword:', err)
    }

    return {
      success,
      userMeta,
      message,
    }
  }

  static async changePassword(fireadmin, userRecord, password) {
    let success = true
    let message = ':/'

    try {
      // firebase auth throws error if account already exists
      const passwordHash = TokenHelper.generateHash(password)

      await FireAuthHelper._savePassword(fireadmin, userRecord.email, passwordHash, userRecord.uid)
    } catch (err) {
      success = false
      message = err.message
    }

    return {
      success,
      message,
    }
  }
}

export default FireAuthHelper
