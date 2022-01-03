const orderSchema = require('../Schema/orderSchema')
const userSchema = require('../Schema/userSchema')

const create = async (req, res) => {
  let orderData = {
    ...req.body,
  }

  const orderModel = new orderSchema(orderData)
  await orderModel
    .save()
    .then(async (doc) => {
      await userSchema
        .updateOne(
          {
            _id: orderData.users,
          },
          { $push: { orders: doc._id } }
        )
        .then((doc2) => {
          res.send({
            success: true,
            message: 'order Created Successfully',
            results: doc,
            results2: doc2,
          })
        })
        .catch((err) => {
          res.status(500).send({ success: false, message: err })
        })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const update = (req, res) => {
  let orderData = {
    ...req.body,
  }
  orderSchema
    .updateOne({ _id: req.params.id }, orderData)
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const getAll = (req, res) => {
  orderSchema
    .find({})
    .populate('users')
    .populate('products')
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}
const getSingle = (req, res) => {
  orderSchema
    .find({ _id: req.params.id })
    .populate('users')
    .populate('products')
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const deleteSingle = (req, res) => {
  orderSchema
    .deleteOne({ _id: req.params.id })
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}

const deleteAll = (req, res) => {
  orderSchema
    .deleteMany({})
    .then((doc) => {
      res.send({ success: true, results: doc })
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err })
    })
}
module.exports = { create, update, getSingle, getAll, deleteSingle, deleteAll }
