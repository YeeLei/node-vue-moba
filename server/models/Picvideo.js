const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    title: { type: String },
    pic: { type: String },
    body: { type: String }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Picvideo', schema)
