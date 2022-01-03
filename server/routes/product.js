const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')

router.post('/product', (req, res) => productController.create(req, res))

router.put('/product/:id', (req, res) => productController.update(req, res))

router.get('/product', (req, res) => productController.getAll(req, res))

router.get('/product/:id', (req, res) => productController.getSingle(req, res))

router.delete('/product/:id', (req, res) =>
  productController.deleteSingle(req, res)
)

router.delete('/product', (req, res) => productController.deleteAll(req, res))

module.exports = router
