import SQLiteRepo from './sqlite3'

class RepoUser {
    async getUserByEmail (email) {
        return SQLiteRepo.getUserByEmail(email)
    }

    async getUserById (user_id) {
        return SQLiteRepo.getUserById(user_id)
    }

    async createUser (name, email, password) {
        return SQLiteRepo.createUser(name, email, password)
    }

    async deleteUser (email) {
        return SQLiteRepo.deleteUser(email)
    }
}

export default new RepoUser()
