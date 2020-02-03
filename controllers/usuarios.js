const {validationResult} = require('express-validator')

const UsuariosValid = require('../validators/Usuarios')

const usuarios = (app) => {

// resposta para a rota com endpoint
    app.get('/', (req, res) => {
       
    })
    
// resposta para a rota raiz
    app.get('/usuarios', (req, res) => {

        const UsuarioDAO = app.models.Usuarios

        UsuarioDAO.lista().then(lista => {
            res.send(lista)
        })
            .catch(erro => {
                console.log(erro)
                res.status(500).send(erro)
            })
    })

    app.post('/usuarios', 
        UsuariosValid.validacoes()
        ,(req, res) => {
        let usuario = req.body

        const erros = validationResult(req)

        if(!erros.isEmpty()){
            res.status(400).send(erros)
        return
        }

        const usuarioDAO = app.models.Usuarios

        usuarioDAO.insere(usuario)
        .then(retorno => res.status(201).send(retorno))
        .catch(erro => {
            console.log(erro)
            res.status(500).send(erro)
        } )
    })

    app.get('/usuarios/email/:email', (req, res) => {
        const email = req.params.email

        usuarioDAO = app.models.Usuarios

        usuarioDAO.buscarPorEmail(email)
           .then(retorno => {
                if(retorno){
                    res.send(retorno)
                }else{
                    res.status(404).send()
                }
            })
           .catch(erro => res.status(500).send('erro : ' + erro))
    })
}

module.exports = usuarios