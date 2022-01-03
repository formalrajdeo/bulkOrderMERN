const mongoose = require('mongoose')
const orderSchema = mongoose.Schema(
  {
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    quantity: { type: 'string' },
    status: { type: 'boolean', default: false },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Order', orderSchema)
