require('dotenv').config();
const {Pool} = require('pg');

const config = {
    host: process.env.HOST_DB, //HOST
    user: process.env.USER_DB, //USER DB
    password: process.env.PASSWORD_DB, //PASWORD DB
    database: process.env.DATABASE //DB NAME
}

const pool = new Pool(config);

module.exports = pool;