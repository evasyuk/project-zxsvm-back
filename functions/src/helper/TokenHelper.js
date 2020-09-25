import { JWT_TTL, JWT_SECRET } from './AppConfigHelper'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class TokenHelper {
  static generateHash(password) {
    return bcrypt.hashSync(password.toString(), 10)
  }

  static comparePassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash)
  }

  static generateToken(payload) {
    const safeTTL = () => {
      const temp = JWT_TTL
      if (temp) {
        if (temp instanceof String) {
          // TODO: improve imperfect check
          if (temp.endsWith('m') || temp.endsWith('d')) {
            return temp
          } else {
            return "1d"
          }
        } else if (temp instanceof Number) {
          return (JWT_TTL || 60) * 1000  // "1d" - 1day, "10" - 10ms => default 1 hour
        } else {
          return "1d"
        }
      } else {
        return "1d"
      }
    }
    const te = safeTTL()
    return jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: te
      },
    )
  }

  static decodeToken(token) {
    let success = false
    let message = null
    let decodedPayload = null

    try {
      decodedPayload = jwt.verify(token, JWT_SECRET)
      success = true
    } catch (err) {
      message = err.message // TODO: can be simplified 'invalid token'
    }

    return {
      success,
      message,
      decodedPayload,
    }
  }
}

export default TokenHelper
