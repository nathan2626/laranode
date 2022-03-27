// const mysql = require('mysql');

// module.exports = class Db {

//     constructor() {
//             const DB_HOST = process.env.DB_HOST
//             const DB_USER = process.env.DB_USER
//             const DB_PASSWORD = process.env.DB_PASSWORD
//             const DB_NAME = process.env.DB_NAME
//             const DB_PORT = process.env.DB_PORT

//             this.db = mysql.createConnection({
//                 host: `${DB_HOST}` || `127.0.0.1`,
//                 port: `${DB_PORT}` || "8889",
//                 user: `${DB_USER}` || `root`,
//                 password: `${DB_PASSWORD}` || `root`,
//                 database : `${DB_NAME}` || `laranode`
//               });

//             this.db.connect(console.log('connect'));
//       }
// }

const { Client } = require('pg')
const {dbUser, dbHost, dbName, dbPassword, dbPort} = require('../config/app.js')
module.exports = class Db {
    constructor() {
      this.client = new Client({
        user: dbUser,
        host: dbHost,
        database: dbName,
        password: dbPassword,
        port: dbPort,
      });
      this.client.connect()
      console.log('Base de données connectée')
    }
}
