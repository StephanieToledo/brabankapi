const express = require('express')

const app = express()

const consign = require('consign')

const bodyParser = require('body-parser')

customExpress = () => {

    // simboliza que havera um middle aware
    app.use(express.json())

    //incluindo o diretorio controllers na variavel app
    consign().include('controllers').include('models').into(app)

    return app
}

module.exports = customExpress()