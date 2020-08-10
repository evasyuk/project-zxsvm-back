import { WrongArgument } from "../error";

const CryptoJS = require('crypto-js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class CryptoHelper {
    constructor(moduleConfig) {
        this.seed = moduleConfig.databaseSeed

        this.JWT_TTL = null
        this.JWT_SECRET = moduleConfig.databaseSeed
    }

    encryptStr = (stringToEncrypt) => {
        if (!stringToEncrypt) {
            throw new WrongArgument('stringToEncrypt')
        }

        return CryptoJS.AES.encrypt(stringToEncrypt, this.seed).toString();
    }

    decryptHash = (hashToDecrypt) => {
        if (!hashToDecrypt) {
            throw new WrongArgument('hashToDecrypt')
        }

        const bytes  = CryptoJS.AES.decrypt(hashToDecrypt, this.seed);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    generatePassword = (stringToEncrypt) => {
        if (!stringToEncrypt) {
            throw new WrongArgument('stringToEncrypt')
        }

        return bcrypt.hashSync(stringToEncrypt.toString(), 10)
    }

    comparePassword = (password, passwordHash) => {
        return bcrypt.compare(password, passwordHash)
    }

    generateToken = async (uid, meta = {}) => {
        if (!uid) {
            throw new WrongArgument('uid')
        }
        const safeTTL = () => {
            const temp = this.JWT_TTL
            if (temp) {
                if (temp instanceof String) {
                    // TODO: imperfect check
                    if (temp.endsWith('m') || temp.endsWith('d')) {
                        return temp
                    } else {
                        return "1d"
                    }
                } else if (temp instanceof Number) {
                    return (this.JWT_TTL || 60) * 1000  // "1d" - 1day, "10" - 10ms => default 1 hour
                } else {
                    return "1d"
                }
            } else {
                return "1d"
            }
        }
        const te = safeTTL()
        return jwt.sign(
            {
                uid,
                meta,
            },
            this.JWT_SECRET,
            {
                expiresIn: te
            },
        )
    }

    verifyAndDecodeToken = (token) => {
        try {
            const decodedUser = jwt.verify(token, this.JWT_SECRET)
            return {
                isError: false,
                errorMessage: null,
                decodedUser,
            }
        } catch (error) {
            return {
                isError: true,
                errorMessage: `db_internal: ${error.message}`,
                decodedUser: null,
            }
        }
    }
}

export default CryptoHelper
