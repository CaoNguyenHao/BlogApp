import express from 'express'; //framerwork create web server

import authRoutes from './routes/authRoutes.js';//import route
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';

import configViewEngine from './config/viewEngine.js';//cấu hình view engine ejs

import dotenv from 'dotenv';//sử dụng các biến môi trường từ file
dotenv.config();//cấu hình biến môi trường

import methodOverride from 'method-override';
import session from 'express-session';

const app = express();//tạo một Express application.
const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 8888;

app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
//config req.body
app.use(express.json()); //utilizes the body-parser package
app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

configViewEngine(app);//cấu hình view engine
app.use(express.static('public'));

// Routes
app.use('/', authRoutes);        // /login, /register
app.use('/posts', postRoutes);       // /posts/:id
app.use('/comments', commentRoutes); // /comments/:postId
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// khởi chạy server tại hostname:port
app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
})