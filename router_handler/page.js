// 获取文章分类列表数据的处理函数
const db = require('../db/index')

exports.getPages = (req, res) => {
  const sql = 'select * from myblog.pages'
  db.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取文章列表成功！',
      data: results,
    })
  })
}

exports.addPages = (req, res) => {
  const sql = `insert into myblog.pages set ?`
  db.query(sql, req.body, (err, results) => {
    // SQL 语句执行失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('新增文章失败！')

    // 新增文章分类成功
    res.cc('新增文章分类成功！', 0)
  })
}

// 删除文章分类的处理函数
exports.deletePageById = (req, res) => {
  const sql = `delete from myblog.pages where id=?`
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')

    // 删除文章分类成功
    res.cc('删除文章分类成功！', 0)
  })
}

// 更新文章分类的处理函数
exports.updatePageById = (req, res) => {
  // const sql = `update myblog.pages set pagepath=? where id=?`
  const pagedata = [
    req.body.pagepath,
    req.body.pagetitle,
    req.body.pagedescribe,
    req.body.pagetime,
    req.body.pageclass,
    req.body.pagetag,
    req.body.pagepic,
    req.body.pagecontent
  ]

  // pagedescribe=? pagetime=? pageclass=? pagetag=? pagepic=? pagecontent=?
  // console.log(pagedata);
  const sql = 'update myblog.pages set pagepath = ?, pagetitle = ?, pagedescribe=?, pagetime=?, pageclass=?, pagetag=?, pagepic=?, pagecontent=? where id= ?'
  db.query(sql, [...pagedata, req.params.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('更新文章失败！')

    // 更新文章分类成功
    res.cc('更新文章成功！', 0)
  })
}

// 根据ID获取文章分类的处理函数

exports.getpagePageById = (req, res) => {

  const sql = 'select * from myblog.pages where id=? '
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // // SQL 语句执行成功，但是影响行数不等于 1
    // if (results.affectedRows !== 1) return res.cc('获取文章失败！')

    res.send({
      status: 0,
      message: '获取文章成功！',
      data: results,
    })
  })
}

exports.addtimeLink = (req, res) => {
  const sql = `insert into myblog.timelink set ?`
  db.query(sql, req.body, (err, results) => {
    // SQL 语句执行失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('新增timelink失败！')

    // 新增文章分类成功
    res.cc('新增timelink成功！', 0)
  })
}

exports.deletelinkById = (req, res) => {
  const sql = `delete from myblog.timelink where id=?`
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('删除失败！')

    // 删除文章分类成功
    res.cc('删除成功！', 0)
  })
}
