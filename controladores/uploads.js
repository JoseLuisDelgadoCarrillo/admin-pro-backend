const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen} = require ('../helpers/actualizar-imagen');



const fileUpload = (req,res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;
    
    //Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg:'No es un medico/usuario/hospital'
        })
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No hay ningun archivo'
        });
      }

    //procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
    const extensionArvhivo = nombreCortado[nombreCortado.length - 1];
    //Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extensionArvhivo)){
        return res.status(400).json({
            ok:false,
            msg: 'No es una extension permitida '
        });
    }

    //Generar el nombre unico del archivo
    const nombreArchivo = `${ uuidv4()}.${extensionArvhivo}`;

    //Path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen
    file.mv( path , (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover imagen'
            });
        }

    //Actualizar base de datos    
    actualizarImagen(tipo,id, nombreArchivo);
        
        res.json({
            ok:true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });



}



const retornaImagen = (req,res =  response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname,`../uploads/${tipo}/${foto}`);

    //Imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join( __dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}