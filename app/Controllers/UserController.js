const Db =  require("../../bootstrap/Db.js")
const UserRepository = require("../Repository/UserRepository.js")
// const User = require("../Models/User.js")

module.exports = class UserController {
    constructor(req, res) {
        this.db = new Db();
        this.req = req
        this.res = res
    }

    async getAll() {
        const users = new UserRepository(this.req, this.res);
        const results = await users.all();
        return results;

    }

    async get(id) {
        const users = new UserRepository(this.req, this.res);
        const results = await users.get(id);
        return results;
    }

    async post(name, email, password){
        const users = new UserRepository(this.req, this.res);
        const results = await users.create(name, email, password);
        return results;
    }

    getPostData(req) {
        return new Promise((resolve, reject) => {
            try {
                let body = ''
    
                req.on('data', (chunk) => {
                    body += chunk.toString()
                })

                req.on('end', () => {
                    resolve(body)
                })
            } 
            catch (error) {
                reject(err)
            }
        })
    }

    async update(id, name, email, password){
        const users = new UserRepository(this.req, this.res);
        const results = await users.update(id, name, email, password);
        return results;
    }

    async delete(id){
        const users = new UserRepository(this.req, this.res);
        const results = await users.delete(id);
        return results;
    }

}