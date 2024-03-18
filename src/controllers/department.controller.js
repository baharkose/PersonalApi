"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// 12 az önce oluşturduğum modeli çektim ve controllerı export ettim.
const Department = require("../models/department.model");

module.exports = {
  // 13 listimizi yazdık asenktron bir funk olacak. Ve CRUD işlemlerimizi yaptık.
  list: async (req, res) => {
    //14 normalde bu şekilde yapıyorduk  const data = await Department.find(search).sort(sort).skip(skip).limit(limit);
    // 15 ancak şimdi bunu hazırladığımız middleware aracılığı ile yazıyoruz.

    const data = await res.getModelList(Department);
    res.status(200).send({
      error: false,
      //16 buraya detail ekleyeceğiz detayları görebilmek için
      detail: await res.getModelListDetails(Department),
      //17   son olarak da datayı yolladık.
      data, // data:data
      //   18 şimdi middlewareslardan findsearcha -->
    });
  },
  create: async (req, res) => {
    // 20 datayı nasıl çekiyoruz. Departmenttan gelen bodyi al. ve datanın içerisine at. ve datayı bize döndür.
    const data = await Department.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    // 21 department modelindeki idyi req.bodyden gelen idye eşit olanı getir.
    const data = await Department.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    // 22 öncelikle verimizi alalım. ne göndericez body ama önce filtreleme yapıcaz.
    const data = await Department.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    // 23 runvalidators true ne işe yarıyor? update edilecek daya department id ve req.idye eşit olanı bulduk. req, bodye bunu ekledik. şimdi biz validasyonlar ekledik ne gibi mailde @ olsun . olsun gibi bu valisdasyon sadece create'e özgü olmasın aynı zamanda update'tede bir validasyona girmesi için bunu ekledik.
    res.status(202).send({
      error: false,
      data,
      // 24 idsi req.paramsa eşit olanı getir ve new olarak gönder.
      // 25 bu aslında ön tarada biraz takviye işlemi. Elinde data varsa gönder gitsin.
      new: await Department.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    data = await Department.deleteOne({ _id: req.params.id });
    // 26 başarılı ise 204 değilse 404 dönmesi lazım. isDeletedcount 0 dan büyükse true değilse false
    const isDeleted = data.deletedCount > 1 ? true : false;
    // 27 isdeleted true is 204 değilse 404 yolla. errora da datanın deleteCountunun tersi, silindi ise false silinmedi ise true gidecek.
    res.status(isDeleted ? 204 : 404).send({
      error: !isDeleted,
      //   burada ya kalan data ya da aynı data gider.
      // 28 şimdi routera department
      data,
    });
  },

  personnels: async (req, res) => {
    // departmana ait personelleri listelemek için ne yaptık. Personeli çağırıdk. Şuan üç parametre aldık.  ilk modeli yolladık. araya bir de filtreleme yolladık. 
    const Personnel = require("../models/personnel.model");
    const data = await res.getModelList(
      Personnel,
      { departmentId: req.params.id },
      "departmentId"
    );
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(
        Personnel,
        { departmentId: req.params.id },
        "departmentId"
      ),
      data,
    });
  },
};
