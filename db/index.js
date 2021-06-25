// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: '用户名',
  password: '密码',
  database: '数据库名',
  charset: 'utf8mb4'
})

// 向外共享 db 数据库连接对象
module.exports = db
