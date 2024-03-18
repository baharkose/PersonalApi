"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// required modules
// ! 1 gruplandırarak yazalım
// - appin ayağa kalkması için en yukarıda requirementları yapalım. env ve portumuzu oladık. ve errorhandler tabi

require("dotenv").config();
const PORT = process.env?.PORT || 8000;
require("express-async-errors");

// ! 2
// Configurations - dbconnection
// connect to db
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

// ! 3 Şimdi sıra middleware kullanımında
app.use(express.json());

// ! 4 SessionCookies
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));

// ! 5 getModelList
app.use(require("./src/middlewares/findSearchSortPage"));

//! 6 Routes

// - router-controler-model yön bu şekilde tanımlarken ise tam tersi

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
  });
});
// continue from here...

// 33
// /departments
// /departments olarak bir istek gelirse o zaman bu routera git.
// burada ana url var onunlada çakışmaması için /departments gelirse bunları bunları yap dedik. Yani routerdakileri. Şimdi department yapımızı bitirmiş olduk. Şimdi personel modele...aynı işlmeler model, controller, router  personel modele irdyi aç bak.

app.use("/departments", require("./src/routes/department.router"));
// /personnels
app.use("/personnels", require("./src/routes/personnel.router"));

/* ------------------------------------------------------- */

//! 7 errorHandler: - buradan departmant.modela ->
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
