const Db =  require("../../bootstrap/Db.js")
//console.log(db.client)

module.exports = class UserController {
    constructor(req, res) {
        this.db = new Db();
        this.req = req
        this.res = res
    }

    // to get all users
    async all() {
        const results = await this.db.client.query("SELECT * FROM users");
        const users = results.rows;
        console.log(users)

        this.res.write(JSON.stringify(users));
        this.res.end();
    }

    // to get a specific user
    async get(id) {
        const results = await this.db.client.query(`SELECT * FROM users WHERE id = ${id}`);
        const user = results.rows;

        // console.log(JSON.stringify(user).length + ' test user')
        this.res.write(JSON.stringify(user));
        this.res.end();
    }

    // to create a user
    async create(name, email, password){
        const text = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'
        const values = [name, email, password]
        try {
            const res = await this.db.client.query(text, values)
            // console.log(res.rows)
            this.res.write(JSON.stringify(res.rows));
        } 
        catch (err) {
            console.log(err.stack)
        }
        this.res.end()
    }

    // to update a user
    async update(id, name, email, password){
        const text = `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = ${id}`
        const values = [name, email, password]
        try {
            const res = await this.db.client.query(text, values)
            console.log("user update")
        } 
        catch (err) {
            console.log(err.stack)
        }
    }


    // to delete a user    
    async delete(id){
        const text = `DELETE FROM users WHERE id = $1`
        const values = [id]
        try {
            const res = await this.db.client.query(text, values)
            console.log("user deleted")
          } catch (err) {
            console.log(err.stack)
          }
       }

}
