const mongoose = require('mongoose')
const productSchema = mongoose.Schema(
  {
    title: { type: 'string' },
    rating: { type: 'string' },
    price: { type: 'string' },
    brand: { type: 'string' },
    weight: { type: 'string' },
    country_of_origin: { type: 'string' },
    reviews: { type: 'string' },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Product', productSchema)
