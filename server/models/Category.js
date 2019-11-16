const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    parent: {
      // 类型一定要关联mongoose数据库字段,ref代表关联的模型
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category'
    }
  },
  {
    timestamps: true
  }
)

schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

schema.virtual('picNewsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Picarticle'
})

module.exports = mongoose.model('Category', schema)
