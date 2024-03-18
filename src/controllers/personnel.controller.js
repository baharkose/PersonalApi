"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel.model");

module.exports = {
  list: async (req, res) => {
    // const data = await Personnel.find(search).sort(sort).skip(skip).limit(limit)
    const data = await res.getModelList(Personnel);

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personnel),
      data, // data: data
    });
  },

  create: async (req, res) => {
    const data = await Personnel.create(req.body);

    //39 eğer isLead true ise diğerleri false olsun. önce req bodyden bir lead aldım. true geldi. sonrada diğerlerini false yapmak için updatemany ile güncelledim.
    const isLead = req.body.isLead || false;
    if (isLead) {
      //40 personel modelin içindeki id, req body'den gelen idye eşit olanı bul ve tüm isleadler true olanları bana getir. ve bana bunları false yap.

      // 41  hem departmentın içindekiler hemde isLead true olanları aldım ve false yaptım.

      // 42 aynı işlemi update için yapalım.

      await Personnel.updateMany(
        { departmentId: req.body.departmentId, isLead: true },
        { isLead: false }
      );
    }

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Personnel.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    // 43 isLead devam
    const isLead = req.body.isLead || false;
    if (isLead) {
      //44 birinci parametre bulma ikinci getirme. Biz burada departmentIdyi aldık. Şimdi personelin içindekini updateMany yapacağız.
      //45   önce findOne yaptık. gelen depertment idyi aldık. Sonra ben true false herkesi aldım.
      const { departmentId } = await Personnel.findOne(
        { _id: req.params.id },
        { departmentId: 1 }
      );
      await Personnel.updateMany(
        //46 departmentID ve isLead true olanların hepsni getir ve onların hepsini false yap.
        { departmentId, isLead: true },
        { isLead: false }
      );
    }
    const data = await Personnel.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Personnel.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Personnel.deleteOne({ _id: req.params.id });

    // const isDeleted = data.deletedCount >= 1 ? true : false;
    // res.status(isDeleted ? 204 : 404).send({
    //   error: !isDeleted,
    //   data,
    // });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
