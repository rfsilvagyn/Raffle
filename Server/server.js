const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv/config')

const app = express()
const port = process.env.PORT
app.use(cors({ credentials: true, origin: '*' }))

const connection = mysql.createConnection({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSDB,
    database: process.env.DATABASE
})

app.get('/', (req, res) => {
    res.status(200).send(`Executando na Porta: ${port}`)
})

app.get('/raffle', (req, res) => {
    connection.query(
        'SELECT * FROM customers ORDER BY RAND() LIMIT 1',
        function (err, results) {
            res.status(200).json(results[0])
            const id = results[0].id
            console.log(id)

            if (err) {
                console.log(err.sqlMessage)
            }
        }
    )
})

app.get('/prizes', (req, res) => {
    connection.query(
        'SELECT * FROM prizes ORDER BY sequence',
        function (err, results) {
            res.status(200).json(results)
            console.log(results)

            if (err) {
                console.log(err.sqlMessage)
            }
        }
    )
})

app.listen(port, () => {
    console.log(`Executando na Porta: ${port}`)
})