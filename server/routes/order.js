const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')

router.post('/order', (req, res) => orderController.create(req, res))

router.put('/order/:id', (req, res) => orderController.update(req, res))

router.get('/order', (req, res) => orderController.getAll(req, res))

router.get('/order/:id', (req, res) => orderController.getSingle(req, res))

router.delete('/order/:id', (req, res) =>
  orderController.deleteSingle(req, res)
)

router.delete('/order', (req, res) => orderController.deleteAll(req, res))

module.exports = router
