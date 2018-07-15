const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'first_db',
    password: '123123123',
    port: 5432,
})

// const client = new Client({
//     user: 'vnovqzkarihdxs',
//     host: 'ec2-54-227-240-7.compute-1.amazonaws.com',
//     database: 'd1cq3r067e15oc',
//     password: '9b30ec1b3b582cbf20c4e1437bffc93c5bc9c4d72f40fdd2da4f2cf1dd701f58',
//     port: 5432,
// })

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}