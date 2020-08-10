import ModuleConfig from "../ModuleConfig";
import CryptoHelper from "./DataProtect";

const test = require('ava');

test('DataProtect', async t => {
    ModuleConfig.init({
        databaseURL: 'process.env.DB_URL',
        databaseCredStr: 'process.env.DB_CERT',
        databaseSeed: 'test'
    })
    const cryptoHelper = new CryptoHelper(ModuleConfig)

    const startString = 'startString'

    const hashString = cryptoHelper.encryptStr(startString)
    const finalString = cryptoHelper.decryptHash(hashString)

    t.is(startString, finalString)
});


