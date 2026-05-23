import mongoose from 'mongoose'

const URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Fantasy_Draft'

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose
            .connect(URL)
            .then(() => console.log('database connection established'))
            .catch((err) => console.log('error occured', err))
    }
}

export default new Database()
