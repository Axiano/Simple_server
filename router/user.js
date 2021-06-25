const express = require('express')
const router = express.Router()
const db = require('../db/index')
var fs = require('fs')
const path = require('path')




// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/index')
// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
// 登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
router.get('/pages', userHandler.getPages)
router.get('/timelinks', userHandler.gettimelinks)
router.get('/getpage/:id', userHandler.getpagePageById)
router.get('/getpagebypath/:pagepath', userHandler.getpagePageByPath)

router.get('/lists', function (req, res) {
  //5.1获取数据
  var obj = req.query;
  //5.2将数据转为整型
  obj.pno = parseInt(obj.pno);
  obj.size = parseInt(obj.size);
  //5.3验证输入是否为空
  if (!obj.pno) obj.pno = 1;//设置默认页码1
  if (!obj.size) obj.size = 2;//默认大小为2
  //5.4计算每页的开始
  var start = (obj.pno - 1) * obj.size;
  //5.5执行SQL语句，把结果响应给浏览器端
  db.query('SELECT * FROM  myblog.pages order by id desc LIMIT ?,?', [start, obj.size], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/showtotalnum', function (req, res) {
  var sql = 'SELECT count(*) as total FROM myblog.pages'
  db.query(sql, [], (err, result) => {
    if (err) throw err
    res.send(result);
  })
})

router.post('/addcomments', (req, res) => {
  const sql = `insert into myblog.comments set ?`
  db.query(sql, req.body, (err, results) => {
    // SQL 语句执行失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('提出评论失败！')
    // 新增文章分类成功
    res.cc('提交评论成功！', 0)
  })
})

fs.readFile(path.join(__dirname, '../publick/aru.json'), 'utf8', function (err, dataStr) {
  var jsonObj2 = eval('(' + dataStr + ')')
  router.aru = jsonObj2.container
  router.get('/getcomments', (req, res) => {
    const sql = 'select * from myblog.comments'
    db.query(sql, (err, results) => {
      // 1. 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 2. 执行 SQL 语句成功
      for (let i = 0; i < results.length; i++) {
        let contents = results[i].content
        const matchReg = /(?<=<).*?(?=:)/g
        if (!contents.match(matchReg)) {
        } else {
          const L = contents.match(matchReg).length
          const tihuan1 = contents.match(/(?<=<).*?(?=:)/g)
          const tihuan2 = contents.match(/<.*?:/g)
          console.log(this.tihuan1)
          for (let j = 0; j < L; j++) {
            const index = router.aru.findIndex(item => item.text === tihuan1[j])
            contents = contents.replace(tihuan2[j], router.aru[index].icon)
          }
        }
        results[i].content = contents
      }
      res.send({
        status: 0,
        message: '获取评论列表成功！',
        data: results,
      })
    })
  })
  router.get('/getreply', (req, res) => {
    const sql = 'select * from myblog.reply'
    db.query(sql, (err, results) => {
      // 1. 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 2. 执行 SQL 语句成功
      for (let i = 0; i < results.length; i++) {
        let contents = results[i].content
        const matchReg = /(?<=<).*?(?=:)/g
        if (!contents.match(matchReg)) {
        } else {
          const L = contents.match(matchReg).length
          const tihuan1 = contents.match(/(?<=<).*?(?=:)/g)
          const tihuan2 = contents.match(/<.*?:/g)
          console.log(this.tihuan1)
          for (let j = 0; j < L; j++) {
            const index = router.aru.findIndex(item => item.text === tihuan1[j])
            contents = contents.replace(tihuan2[j], router.aru[index].icon)
          }
        }
        results[i].content = contents
      }
      res.send({
        status: 0,
        message: '获取评论列表成功！',
        data: results,
      })
    })
  })
})

router.post('/addreply', (req, res) => {
  const sql = `insert into myblog.reply set ?`
  db.query(sql, req.body, (err, results) => {
    // SQL 语句执行失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('提出评论失败！')
    // 新增文章分类成功
    res.cc('提交评论成功！', 0)
  })
})

// router.get('/getreply', (req, res) => {
//   const sql = 'select * from myblog.reply'
//   db.query(sql, (err, results) => {
//     // 1. 执行 SQL 语句失败
//     if (err) return res.cc(err)
//     // 2. 执行 SQL 语句成功
//     res.send({
//       status: 0,
//       message: '获取评论列表成功！',
//       data: results,
//     })
//   })
// })

module.exports = router