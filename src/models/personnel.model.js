"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

// ! 34
// bir password kullanacağımız için helperstan çektik encyrpti
const passwordEncrypt = require("../helpers/passwordEncrypt");

const PersonnelSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      // foreignkey
      //35 refere ettik. diğer department ile ilişkili olması için
      ref: "Department",
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      // 37  passwordu set etderken helper ile bir kriptolama işlemi yapıyoruz sonrasında set ediyoruz. oraya bakabilirsin
      set: (password) => passwordEncrypt(password),
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      //   38 emailde ekstra olarak validasyon var. Burada update içinde kontrol işlemi yapılmış oluyor modelde yazıldığı için. gerçekte regex komutları ile yapmamız gerekir. Diğer alanlar standart.
      validate: (email) => email.includes("@") && email.includes("."),
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    salary: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    // 39 buralar çok kullanacağımız fiedlar,
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isLead: {
      type: Boolean,
      default: false,
    },
    // şuanki tarihi al
    startedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "personnels", timestamps: true }
);

/* ----------------------------*/
module.exports = mongoose.model("Personnel", PersonnelSchema);
