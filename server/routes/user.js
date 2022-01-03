const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.post('/user', (req, res) => userController.create(req, res))

router.put('/user/:id', (req, res) => userController.update(req, res))

router.get('/user', (req, res) => userController.getAll(req, res))

router.get('/user/:id', (req, res) => userController.getSingle(req, res))

router.delete('/user/:id', (req, res) => userController.deleteSingle(req, res))

router.delete('/user', (req, res) => userController.deleteAll(req, res))

module.exports = router
