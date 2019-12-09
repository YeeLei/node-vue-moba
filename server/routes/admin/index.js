module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    // 父级路由合并到子级路由
    mergeParams: true
  })

  // 新建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      // 如果查询模块名称为Category,则加上关联字段parent
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find()
      .setOptions(queryOptions)
      .populate('categories')
      .limit(100)
      .sort({ createdAt: -1 })
    res.send(items)
  })
  // 获取分类详情页数据
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  // 上传资源中间件
  const resourceMiddleware = require('../../middleware/resource')

  app.use(
    '/admin/api/rest/:resource',
    authMiddleware(),
    resourceMiddleware(),
    router
  )

  // 上传头像
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post(
    '/admin/api/upload',
    authMiddleware(),
    upload.single('file'),
    async (req, res) => {
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    }
  )

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    // 1. 根据邮箱查找用户
    const User = await AdminUser.findOne({ email }).select('+password')
    assert(User, 422, '邮箱或密码错误！')

    // 2. 校验密码
    const isValid = require('bcryptjs').compareSync(password, User.password)
    assert(isValid, 422, '邮箱或密码错误！')

    // 3. 返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign(
      {
        id: User._id,
        name: User.name,
        avatar: User.avatar,
        email: User.email
      },
      app.get('secret')
    )
    res.send({ token })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
