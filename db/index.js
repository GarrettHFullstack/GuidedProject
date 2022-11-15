const pg = require('pg')

const client  = new pg.Client('postgres://localhost:5432/a_sad_attempt')

module.exports = { client }


// \l
// \c
// \d
// \dt
