const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    username: { type: 'string' },
    email: { type: 'string' },
    phone_no: { type: 'string' },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('User', userSchema)
