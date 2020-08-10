import { loadCfg } from "../helper/DotEnv";
import "../helper/ObjectEnhancer";
import ModuleConfig from "../ModuleConfig";
import SourceFirebase from "./sourceFirebase";

loadCfg()
ModuleConfig.init()
SourceFirebase.init(ModuleConfig)

const test = require('ava');
const repo = new SourceFirebase()

test('check not exists', async t => {
    const userExists = await repo.checkUserExists('impossible@test.com')

    t.is(userExists, false)
});

test('createNewUser', async t => {
    await repo.createUser('1@1.com', 'my test', '123456')
    const userExists = await repo.checkUserExists('1@1.com')

    t.is(userExists, true)
});

test('check exists', async t => {
    const userExists = await repo.checkUserExists('1@1.com')

    t.is(userExists, true)
});
