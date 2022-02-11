const bcrypt = require("bcryptjs/dist/bcrypt");
const {response} = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { findOne } = require("../models/usuario");


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


const googleSignIn = async ( req, res = response) => {

    const googleToken = req.body.token;

    try {

        const {name, email, picture} = await googleVerify( googleToken);

        //Verificar si existe el usuario en la base de datos
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if(!usuarioDB){
            //no exite usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google:true
            })
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@@';
        }

        //Guardar usuario en DB
        await usuario.save();

        //Generar TOKEN - JWT
        const token = await generarJWT(usuario.id);
        
        res.json({
            ok:true,
            msg: 'Google sign in',
            token
        });
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg: 'Token no es correcto',
            
        });
    }

}

const renewToken = async (req, res = response) =>{

    const uid = req.uid;

    //Generar TOKEN - JWT
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token

    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}