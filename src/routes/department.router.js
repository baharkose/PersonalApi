"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const department = require("../controllers/department.controller");
// !30

// 31 URL: /departments - eğer slash department ise direk list işlemine gönder.

// /departments'a post gelince direk create'a gönder. Bu eğer id ve get ise

router.route("/").get(department.list).post(department.create);

router
  .route("/:id")
  .get(department.read)
  .put(department.update)
  .patch(department.update)
  .delete(department.delete);

//   32 şimdi indexe

/* ------------------------------------------------------- */
module.exports = router;
