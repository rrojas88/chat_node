/*
npm install express --save
npm install socket.io --save
-- Dependencia solo para Desarrollo
npm install nodemon --save-dev
*/
const express = require('express')
const app = express()
const server = require('http').Server(app)

const io = require('socket.io')(server)

app.use( express.static('client') )

app.get('/p1', function(req, res){
	res.status(200).send('Prueba')
})

let messages = [
	{ id: 1,
	text: 'Message 1',
	nick: 'Bot' }
]

/// conex socket
io.on('connection', function ( socket ){
	console.log('new conn. IP='+socket.handshake.address)

	socket.emit('messages', messages)

	socket.on('add-msg', function ( data ){
		messages.push( data )

		io.sockets.emit('messages', messages)
	})
})

server.listen(6677, function(){
	console.log('server ok')
})