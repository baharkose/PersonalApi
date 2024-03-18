"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

// ! 8 bir departman olacak buna ait personaller bunları birbirine bağlayacğaız.

// 9 önclikle şema oluştur. iki tane parametre alır. biri içerikler diğeri özellikler

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { collection: "departmants", timestamps: true }
  //   tablo adı ver, createdAt ve updatedAt otomatik oluşsun.
);

module.exports = mongoose.model("Department", DepartmentSchema);
// 10 artık bir model oluşturayım department adında ve bunu DepartmentSchema'dan alayım.

// 11 controllera
