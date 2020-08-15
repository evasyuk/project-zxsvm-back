import dbWrapper from './sqlite3'

class Temp {
    static up = "CREATE TABLE IF NOT EXISTS lorem (info TEXT) "
}

class User {
    static up = "CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT)"
    static getUserByEmail = (email) => `SELECT * FROM users WHERE email = "${email}"`
    static getUserById = (user_id) => `SELECT * FROM users WHERE user_id = "${user_id}"`
    static createUser = (name, email, password) => `INSERT INTO users (name, email, password) VALUES("${name}", "${email}", "${password}")`
    static deleteUser = (email) => `DELETE from users WHERE email = "${email}"`
}

const allClasses = [
    User,
    Temp,
]

class SQLiteRepo {
    constructor() {
        dbWrapper.up(allClasses.map((clas) => clas.up))
    }

    getUserByEmail = (email) => {
        return dbWrapper.run(User.getUserByEmail(email))
    }

    getUserById = (user_id) => {
        return dbWrapper.run(User.getUserById(user_id))
    }

    createUser = (name, email, password) => {
        return dbWrapper.run(User.createUser(name, email, password))
    }

    deleteUser = (email) => {
        return dbWrapper.run(User.deleteUser(email))
    }
}

export default new SQLiteRepo()
