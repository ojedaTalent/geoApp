'use_strict'
const { Pool, Client } = require('pg');

const env = {
    development: {
        /* connectionString: process.env.DATABASE_URL, */
        user: 'ixjkopqrwcnjvb',
        host: "ec2-174-129-240-67.compute-1.amazonaws.com",
        database: 'd2ctidlljpelc3',
        password: "344fe1b9bc059ef1d067e80750da5500dbcc868e740268083639ba23e43fa5fe",
        port: 5432,
        ssl: true
    }
}
     

const client = new Client(env.development)

module.exports = client;