const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ticketRoutes = require('./routes/ticketRoutes');
const logger = require('morgan');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

// MongoDB Connection
mongoose.connect('mongodb+srv://user:tA1H1LYIGggTfZge@cluster0.z5k4a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => console.log('Connected to MongoDB'));

// WebSocket for Real-Time Updates
io.on('connection', (clientSocket) => {
    console.log('A client connected');
    clientSocket.on('disconnect', () => console.log('Client disconnected'));
});

// Attach WebSocket to Routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

// API Routes
app.use('/api/tickets', ticketRoutes);

// Start Server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
