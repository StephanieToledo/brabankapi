const {check, body} = require('express-validator')

const usuarioDAO = require('../models/Usuarios')

class Usuarios{

    static validacoes(){
        return [
            check('nome').isLength({min: 5, max: 100})
                .withMessage('Nome deve ter no mínimo 5 caracteres.'),
            check('email').isEmail()
                .withMessage('Deve ser um email valido.'),
            check('cpf').isNumeric()
                .withMessage('Deve ser apenas numeros.'),
            check('sexo').isLength({min: 1, max: 1})
                .withMessage('Deve ter apenas um caracter (M ou F)'),
            check('senha').isLength({min: 6, max: 15})
                .withMessage('A senha deve ter entre 6 e 15 caracteres'),
            body('email').custom(email => {
                return usuarioDAO.buscarPorEmail(email)
                    .then(retorno => {
                    if(retorno)
                        return Promise.reject('Email ja cadastrado!')
                })
            })
        ]
    }
}

module.exports = Usuarios