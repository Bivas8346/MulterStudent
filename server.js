const express=require('express')
const ejs=require('ejs')

const app=express()

const router=require('./router/Router')
const mongoose = require('mongoose')


const multer = require("multer");
const session = require("express-session");
const path = require("path");


app.use(express.urlencoded({extended: true}));

app.set('view engine','ejs')
app.set('views','views');



app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use(express.static("upload"));


app.use(
    session({
      secret: "BIVAS",
      saveUninitialized: true,
      resave: false,
    })
  );


  app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
  });

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload");
    },
    filename: function (req, file, cb) {
      let ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });

  const fileFilter = (req, file, callback) => {
    if (
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpg") ||
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("webp")
    ) {
      callback(null, true);
    } else {
      console.log("Error in uploading");
      callback(null, false);
    }
  };

  app.use(
    multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: { fieldSize: 1024 * 1024 * 5 },
    }).single("image")
  );
  


app.use(router)



const dblink = "mongodb+srv://rajdasrd8346:6cW8Gp7Y2iueeWP2@cluster0.cwf3mun.mongodb.net/crud"
const port = process.env.PORT || 2880

mongoose.connect(dblink, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port, () => {
            console.log(`server is running port at http://localhost:${port}`);
            console.log(`database connection successfully`);
        })
    }).catch(error => {
        console.log(error);
    })
