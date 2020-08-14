import RepoUser from './RepoUser'

const test = require('ava');

test('create/exists/delete session', async t => {
    let res
    const now = Date.now()
    const name = `test${now}`
    const email = `test${now}@my.com`
    const password = '123456'

    const expectedUser = {
        email,
        name,
        password,
    }

    try {
        await RepoUser.createUser(name, email, password)

        res = await RepoUser.getUserByEmail(email)
        t.is(res.length, 1)
        delete res[0].user_id
        t.deepEqual(expectedUser, res[0])

        await RepoUser.deleteUser(email)

        res = await RepoUser.getUserByEmail(email)
        t.is(res.length, 0)
    } catch (err) {
        t.fail(err)
    }
});