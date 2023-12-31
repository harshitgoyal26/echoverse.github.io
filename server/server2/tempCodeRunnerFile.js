import express from "express" ;
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors" ;
import dotenv from "dotenv" ;
import multer from "multer";
import helmet from "helmet" ;
import morgan from "morgan";
import path from "path" ;
import { fileURLToPath } from "url";

// Configurations
const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename) ;
dotenv.config({ path: "D:\D\Documents My\VS Code\Projects\Social Media\server\.env"}) ;
const app = express() ;
app.use(express.json()) ;
app.use(helmet()) ;
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin"})) ;
app.use(morgan("common")) ;
app.use(bodyParser.json({ limit : "30mb" , extended: true})) ;
app.use(bodyParser.urlencoded({ limit: "30mb" , extended: true})) ;
app.use(cors()) ;
app.use("/assets" , express.static(path.join(__dirname , 'public/assets'))) ;

// File Storage
const storage = multer.diskStorage({
    destination: function (req , file , cb) {
        cb(null , "public/assets") ;
    },
    filename: function (req , file , cb) {
        cb(null , file.originalname) ;
    }
}) ;
const upload = multer({ storage });

//  Mongoose setup
const PORT = process.env.PORT || 6001 ;
mongoose
.connect('mongodb+srv://admin:admin@cluster0.n7uw49p.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true ,
})
.then(() => {
    app.listen(PORT , () => console.log(`Server Port: ${PORT}`)) ;
})
.catch((error) => console.log(`${error} did not connect`)) ;


const check1 = process.env.PORT ;
console.log(`${check1}`) ;


