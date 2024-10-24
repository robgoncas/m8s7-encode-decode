const express = require('express');
const jwtEncode = require('jwt-encode');
const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

//Clave secreta para firmar los tokens
const claveSecreta = 'claveSuperSecreta'; 

//Ruta para generar un JWT usando jwt-encode

app.post('/generar-token-encode', (req, res) => {
    //Recibe el payload desde el cuerpo de la solicitud
    const { payload } = req.body; 
    //Genera el token con jwt-encode
    const token = jwtEncode(payload, claveSecreta); 
    res.json({ token });
});

//Ruta para decodificar un JWT usando jwt-decode
//TOKENS SIN FIRMAR
app.post('/decodificar-token-decode', (req, res) => {
    //Recibe el token desde el cuerpo de la solicitud
    const { token } = req.body; 
    try {
        //Decodifica el token
        const decoded = jwtDecode(token); 
        res.json({ decoded });
    } catch (error) {
        res.status(400).json({
            error:true, 
            codigo:400, 
            mensaje: 'Token no válido' 
        });
    }
});

//ESTE SI DECODIFICA TOKENS FIRMADOS
app.post('/decodificar-token-decode2', (req, res) => {
    const { token } = req.body;
    const claveSecreta = 'tu-clave-secreta';

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, claveSecreta);
        res.json({ decoded });
    } catch (error) {
        res.status(400).json({
            error: true,
            codigo: 400,
            mensaje: 'Token no válido o clave incorrecta'
        });
    }
});

//Ruta para generar un JWT usando jsonwebtoken
app.post('/generar-token-jsonwebtoken', (req, res) => {
    //Recibe el payload
    const { payload } = req.body; 
    //Genera el token con jsonwebtoken y tiempo de expiración
    const token = jwt.sign(payload, claveSecreta, { expiresIn: '1h' }); 
    res.json({ token });
});

//Ruta para decodificar un JWT usando jsonwebtoken (sin verificar la firma)
app.post('/decodificar-token-jsonwebtoken', (req, res) => {
    const { token } = req.body;
    try {
        //Decodifica el token sin verificar la firma
        const decoded = jwt.decode(token); 
        res.json({ decoded });
    } catch (error) {
        res.status(400).json({ error: 'Token no válido' });
    }
});

//Ruta para verificar un JWT usando jsonwebtoken (verifica la firma)
app.post('/verificar-token-jsonwebtoken', (req, res) => {
    const { token } = req.body;
    try {
        //Verifica el token con la clave secreta
        const verified = jwt.verify(token, claveSecreta); 
        res.json({ verified });
    } catch (error) {
        res.status(400).json({ 
            error: true,
            codigo: 400,
            mensaje: 'Firma del token no válida' 
        });
    }
});

//Iniciar el servidor en el puerto 3000

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
