import { WrongArgument, UserAlreadyExists } from '../error'
import CryptoHelper from "../helper/DataProtect";

let admin
let cryptoHelper

class SourceFirebase {
    static init = (moduleConfig) => {
        cryptoHelper = new CryptoHelper(moduleConfig)
        admin = require("firebase-admin");

        const serviceAccount = JSON.parse(moduleConfig.databaseCredStr)

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: moduleConfig.databaseCredStr,
        });

        SourceFirebase.userRef = admin.database().ref('server/users')
    }

    checkUserExists = async (email) => {
        if (!email || typeof email !== 'string') {
            throw new WrongArgument()
        }

        const emailHash = await cryptoHelper.encryptStr(email)

        await SourceFirebase.userRef.orderByKey().equalTo(emailHash)

    }

    createUser = async (email, name, password) => {
        if (!email || typeof email !== 'string') {
            throw new WrongArgument()
        }
        if (!name || typeof name !== 'string') {
            throw new WrongArgument()
        }
        if (!password || typeof password !== 'string') {
            throw new WrongArgument()
        }

        if (await this.checkUserExists()) {
            throw new UserAlreadyExists()
        }

        const emailHash = await cryptoHelper.encryptStr(email)
        const passwordHash = await cryptoHelper.encryptStr(password)
        const nameHash = await cryptoHelper.encryptStr(name)

        await SourceFirebase.userRef.push().set({
            email: emailHash,
            password: passwordHash,
            name: nameHash,
        })
    }

    checkUserPassword = () => {

    }
}

export default SourceFirebase
