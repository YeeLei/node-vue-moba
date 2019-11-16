const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    icon: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Good', schema)
