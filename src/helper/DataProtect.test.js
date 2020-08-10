import ModuleConfig from "../ModuleConfig";
import CryptoHelper from "./DataProtect";

const test = require('ava');

ModuleConfig.init({
    databaseURL: 'process.env.DB_URL',
    databaseCredStr: 'process.env.DB_CERT',
    databaseSeed: 'test'
})

test('AES encryption/decryption with same time seed', async t => {

    const cryptoHelper = new CryptoHelper(ModuleConfig)

    const startString = 'startString'

    const hashString = cryptoHelper.encryptStr(startString)
    const finalString = cryptoHelper.decryptHash(hashString)

    t.is(startString, finalString)
});

test('bcrypt password', async t => {
    const cryptoHelper = new CryptoHelper(ModuleConfig)

    const originalPassword = '123456'
    const hashedPassword = cryptoHelper.generatePassword(originalPassword)

    t.is(await cryptoHelper.comparePassword(originalPassword, hashedPassword), true)
});


