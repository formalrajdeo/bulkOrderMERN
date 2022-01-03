const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()

const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const userRoute = require('./routes/user')
const app = express()

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send({ success: true, message: 'You are in Home Page' })
})

//============== ROUTES =======================

app.use('/api', productRoute)
app.use('/api', orderRoute)
app.use('/api', userRoute)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Connected to database')

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})

mongoose.connection.on('error', (err) => {
  console.log('Database error:' + err)
})

module.exports = app
