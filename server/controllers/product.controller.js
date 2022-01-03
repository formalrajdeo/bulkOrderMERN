const productSchema = require('../Schema/productSchema')

const create = (req, res) => {
  let productData = {
    ...req.body,
  }
  const productModel = new productSchema(productData)
  productModel
    .save()
    .then((doc) => {
      res.send({
        success: true,
        message: 'Product Created Successfully',
        results: doc,
      })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const update = (req, res) => {
  let productData = {
    ...req.body,
  }
  productSchema
    .updateOne({ _id: req.params.id }, productData)
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const getAll = (req, res) => {
  productSchema
    .find({})
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const getSingle = (req, res) => {
  productSchema
    .find({ _id: req.params.id })
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const deleteSingle = (req, res) => {
  productSchema
    .deleteOne({ _id: req.params.id })
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const deleteAll = (req, res) => {
  productSchema
    .deleteMany({})
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}
module.exports = { create, update, getSingle, getAll, deleteSingle, deleteAll }
