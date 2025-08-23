
const mongoose = require('mongoose');

const PromoSchema = new mongoose.Schema({
  promo: {
    type: String,
    required: true,
    unique: true,
  },
  used:{
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    required: true,
    default: 5,
  },

  user:{type: String}
},{
  timestamps: true
});


module.exports = mongoose.model('PromoCode', PromoSchema); 
