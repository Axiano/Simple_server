## Simple_server

### 简述
这是一个使用express 搭建的接口项目。
### 结构
```
-simple_server
 -db
  --index.js 配置数据
 -publick
  --aru.json 表情包
 -router
  --page.js
  --user.js
 -router_handler
  --page.js
  --user.js
 -schema
  --index.js
```
## 使用
### 下载
### 安装依赖
```
npm install
```
### 配置数据
```js
const db = mysql.createPool({
  host: '127.0.0.1',
  user: '用户名',
  password: '密码',
  database: '数据库',
  charset: 'utf8mb4'
})
```
### 数据库结构
```
-ev_users 登录注册
 -id
  -username
  -password
-pages 文章
  -id
  -pagepath
  -pagetitle
  -pagedescribe
  -pagetime
  -pageclass
  -pagetag
  -pagepic
  -pagecontent
-timelink 时光机
  -id 
  -timecontent
  -time
  -timeinfo
  -pic
-comments 留言
  -id
  -email
  -nickname
  -content
  -time
  -url
-reply 回复
  -id
  -fid
  -replypeople	
  -email
  -nickname
  -content
  -time
  -url
```







