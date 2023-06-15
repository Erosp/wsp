const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
//const client = new Client();
const client = new Client({ authStrategy: new LocalAuth(), puppeteer: { headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']} });

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

    //const number = "+593993318814";

  // Your message.
    //const text = "Hola saludos, en que te puedo ayudar?";

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    //const chatId = number.substring(1) + "@c.us";

    // Sending message.
    //client.sendMessage(chatId, text);

    const express = require('express');
    const app = express();
    const server = require('http').createServer(app);
    app.use(express.json());

    /*app.get('/prueba', (req, res) => {
        client.sendMessage(chatId, "Mensaje de Prueba");
        res.json("Hola");
    });*/

    app.post('/enviar', (req, res) => {
        let destino = req.body.destino;
        let mensaje = req.body.mensaje;

        let chatId = destino.substring(1) + "@c.us";

        client.sendMessage(chatId, mensaje);
        res.json("enviado");
    });

    app.all('*', (req, res, next) => {
        res.json("Defecto");
    });

    server.listen(3005, () => console.log('Conectado puerto 3005'));
});

client.initialize();

client.on('message', message => {
	console.log(message.body);
    client.sendMessage(message.from, '*¡Bienvenidos a IEH! Pronto automatizaremos el servicio.*');
});