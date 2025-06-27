import express from 'express'; //framerwork create web server
// import apiRoutes from './routes/api.js';//import route
// import configViewEngine from './config/viewEngine.js';//cấu hình view engine ejs
import dotenv from 'dotenv';//sử dụng các biến môi trường từ file
dotenv.config();//cấu hình biến môi trường
import methodOverride from 'method-override';

const app = express();//tạo một Express application.
const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 8888;

//config req.body
app.use(express.json()); //utilizes the body-parser package
app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

configViewEngine(app);//cấu hình view engine
app.use('/', apiRoutes);//định tuyến routing

// khởi chạy server tại hostname:port
app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
})