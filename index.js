const express = require('express');
const path = require('path');
const app = express();
const SocketIO = require('socket.io');

// settings
app.set('port', process.env.PORT || 3002);

// Manejador para favicon.ico (previene el error 404)
app.get('/favicon.ico', (req, res) => res.status(204));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

// WebSockets
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('New connection', socket.id);

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
    
});
