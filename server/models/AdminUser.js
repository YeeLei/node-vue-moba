const mongoose = require('mongoose')
const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      select: false, // 不显示密码
      set: val => {
        return require('bcryptjs').hashSync(val, 10)
      }
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('AdminUser', schema)
