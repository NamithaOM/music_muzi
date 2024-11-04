const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToDB = require('./database');
const path = require('path');
const expressFileupload = require('express-fileupload');
const session = require('express-session');
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 3005
const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    credentials: true // Allow sending cookies along with requests
}));

// Serve static files from genre/public/adds and Artist/public/music directories
app.use('/adds', express.static(path.join(__dirname,  'public', 'adds')));
app.use('/music', express.static(path.join(__dirname, 'public', 'music')));
app.use('/image', express.static(path.join(__dirname, 'public', 'uploads')));
app.use('/events', express.static(path.join(__dirname,  'public', 'events')));

app.use(expressFileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: true
}));

connectToDB();

const genreRouter = require('./genre/genre.router');
const registerRouter = require('./Registration/register.router');
const artistRouter = require('./Artist/artist.router');
const userRouter = require('./user/user.router');

app.get('/', (req, res) => { res.send('loaded'); });

app.use('/genre', genreRouter);
app.use('/Registration', registerRouter);
app.use('/Artist', artistRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log('listening on port 3005');
});
