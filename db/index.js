const pg = require('pg')

const client  = new pg.Client('postgres://localhost:5432/localDBName')

module.exports = { client }


// \l
// \c
// \d
// \dt
