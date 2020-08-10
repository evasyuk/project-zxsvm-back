import { WrongArgument } from "../error";

const CryptoJS = require("crypto-js");

class CryptoHelper {
    constructor(moduleConfig) {
        this.seed = moduleConfig.databaseSeed
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
}

export default CryptoHelper
