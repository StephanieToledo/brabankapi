const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: '54.87.132.108',
    port: 3306,
    user: 'stephanie',
    password: '127bcd',
    database: 'brabank'
})

module.exports = conexao