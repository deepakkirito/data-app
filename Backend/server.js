const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();
const io = socket(7001, {
    cors: {
        origin: '*'
    }
});
const routes = require('./Routes/api-routes');
dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://deepakkirito:Deep%40kkirito@cluster0.otcmztf.mongodb.net/test');
let db = mongoose.connection;

// <=================================================================================================>

io.on('connection', clientSocket => {
    
    clientSocket.on('updateRealtime', data => {
        clientSocket.emit('user-data', data);
        clientSocket.broadcast.emit('global-data', data);
        // console.log(data);
    });

    clientSocket.on('disconnect', () => {
        clientSocket.emit('diss', 'user disconnected')
    });
});

app.set('socket-io', io);

// <=================================================================================================>

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
    // res.status(200).send({msg: 'Welcome to the Server'})
    next();
});

app.use("/data", routes);

// <=================================================================================================>

db.on('error', console.error.bind(console, 'DB Connection error!'));
db.on('open', () => {
    console.log('MongoDB is connected successfully');
    startServer();
});

const startServer = () => {
    app.listen(7000, () => {
        console.log(`Server is running at: http://localhost:${process.env.PORT}`);
    })
};

// <=================================================================================================>