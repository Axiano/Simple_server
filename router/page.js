const express = require('express')
const router = express.Router()
// 导入文章分类的路由处理函数模块
const expressJoi = require('@escook/express-joi')

const Pages = require('../router_handler/page')

const { delete_cate_schema } = require('../schema/index')

router.get('/pages', Pages.getPages)
// 新增文章的路由
router.post('/addpage', Pages.addPages)

// 删除文章的路由
router.get('/deletepage/:id', expressJoi(delete_cate_schema), Pages.deletePageById)

// 根据id更新文章的路由
router.post('/undatepage/:id', Pages.updatePageById)

// 更具id获取文章的路由
router.get('/getpage/:id', Pages.getpagePageById)

router.post('/addlink', Pages.addtimeLink)

router.get('/deletelink/:id', Pages.deletelinkById)

router.get('/deletecomments/:id', (req, res) => {
  const sql = `delete from myblog.comments where id=?`
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('删除评论失败！')

    // 删除文章分类成功
    res.cc('删除评论成功！', 0)
  })
})

router.get('/deletereply/:id', (req, res) => {
  const sql = `delete from myblog.reply where id=?`
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('删除评论失败！')

    // 删除文章分类成功
    res.cc('删除评论成功！', 0)
  })
})

module.exports = router