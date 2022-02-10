const bcrypt = require("bcryptjs/dist/bcrypt");
const {response} = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");


const login = async ( req,res = response)=> {

    const {email,password} = req.body;
    try {
        //Verificar email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            });
        }

        //Verificar contrasenia
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contrasenia no valida'
            });
        }

        //Generar TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
           token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error en el login'
        });
    }

}


module.exports = {
    login
}