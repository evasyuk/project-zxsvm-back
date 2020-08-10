class RepoUser {
    static init = (source) => {
        RepoUser.source = source
    }

    verifyLogin = async (emailToCheck) => {
        await RepoUser.source.checkUserExists(emailToCheck)
    }

    registration = (user) => {

    }

}