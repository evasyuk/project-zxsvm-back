import { WrongArgument, UserAlreadyExists, NotInitialized } from '../error'
import CryptoHelper from "../helper/DataProtect";
import User from '../model/User'

let admin
let cryptoHelper

class SourceFirebase {
    static init = (moduleConfig) => {
        cryptoHelper = new CryptoHelper(moduleConfig)
        admin = require("firebase-admin");

        const serviceAccount = JSON.parse(moduleConfig.databaseCredStr)

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: moduleConfig.databaseURL,
        });

        SourceFirebase.userRef = admin.database().ref('/users')
        SourceFirebase.initialized = true
    }

    checkUserExists = async (email) => {
        if (!SourceFirebase.initialized) {
            throw new NotInitialized('SourceFirebase')
        }
        if (!email || typeof email !== 'string') {
            throw new WrongArgument('email')
        }

        const emailHash = email.toBase64()

        const isEqual = await SourceFirebase.userRef
            .orderByKey()
            .equalTo(emailHash)
            .once("value")
            .val

        console.log('isEqual', isEqual)

        return Boolean(isEqual)
    }

    createUser = async (email, name, password) => {
        if (!SourceFirebase.initialized) {
            throw new NotInitialized('SourceFirebase')
        }

        if (!email || typeof email !== 'string') {
            throw new WrongArgument('email')
        }
        if (!name || typeof name !== 'string') {
            throw new WrongArgument('name')
        }
        if (!password || typeof password !== 'string') {
            throw new WrongArgument('password')
        }

        if (await this.checkUserExists(email)) {
            throw new UserAlreadyExists()
        }

        const emailHash = await cryptoHelper.encryptStr(email)
        const passwordHash = await cryptoHelper.generatePassword(password)
        const nameHash = await cryptoHelper.encryptStr(name)

        return SourceFirebase.userRef.push().set({
            uid: 'uid',
        })

        return new User({ email, name })
    }

}

export default SourceFirebase
