// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '1.15.236.39',
  user: 'myblog',
  password: 'fxsBEdBfk5BMxGtd',
  database: 'myblog',
  charset: 'utf8mb4'
})

// 向外共享 db 数据库连接对象
module.exports = db