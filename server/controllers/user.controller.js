const userSchema = require('../Schema/userSchema')

const create = (req, res) => {
  let userData = {
    ...req.body,
  }
  const userModel = new userSchema(userData)
  userModel
    .save()
    .then((doc) => {
      res.send({
        success: true,
        message: 'user Created Successfully',
        results: doc,
      })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const update = (req, res) => {
  let userData = {
    ...req.body,
  }
  userSchema
    .updateOne({ _id: req.params.id }, userData)
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const getAll = (req, res) => {
  userSchema
    .find({})
    .populate('orders')
    .populate({
      path: 'orders',
      populate: {
        path: 'products',
        model: 'Product',
      },
    })
    .exec()
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const getSingle = (req, res) => {
  userSchema
    .find({ _id: req.params.id })
    .populate('orders')
    .populate({
      path: 'orders',
      populate: {
        path: 'products',
        model: 'Product',
      },
    })
    .exec()
    .populate('orders')
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const deleteSingle = (req, res) => {
  userSchema
    .deleteOne({ _id: req.params.id })
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const deleteAll = (req, res) => {
  userSchema
    .deleteMany({})
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}
module.exports = { create, update, getSingle, getAll, deleteSingle, deleteAll }
