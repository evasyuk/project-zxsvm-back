class FirestoreHelper {
  static async getUserByEmail({ fireadmin, email }) {
    let success = false
    let message = null
    let userRecord = null

    try {
      const _userRecord = await fireadmin.auth().getUserByEmail(email)

      userRecord = {
        email: _userRecord.email,
        emailVerified: _userRecord.emailVerified,
        displayName: _userRecord.displayName,
        phoneNumber: _userRecord.phoneNumber,
        photoURL: _userRecord.photoURL,
        disabled: _userRecord.disabled,
      }

      success = true
    } catch (err) {
      message = err.message
    }

    return {
      success,
      message,
      userRecord,
    }
  }
}

export default FirestoreHelper
