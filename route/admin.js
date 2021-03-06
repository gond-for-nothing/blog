//引用express框架
const express=require('express');


const admin = express.Router();
//引入body-parser模块，用来处理post请求参数


//渲染登录页面
admin.get('/login',require('./admin/loginPage'));


//实现登录功能
admin.post('/login',require('./admin/login'));


//创建用户列表路由
admin.get('/user',require('./admin/user'));

//实现退出功能
admin.get('/logout',require('./admin/logout'));

//创建用户编辑页面路由
admin.get('/user-edit',require('./admin/user-edit'));
//创建用户编辑页面路由
admin.get('user-edit',require('./admin/user-edit'));
//创建实现用户添加功能路由
admin.post('/user-edit',require('./admin/user-edit-fn'));
//创建实现用户修改的路由
admin.post('/user-modify',require('./admin/user-modify'));
//创建用户删除功能路由
admin.get('/delete',require('./admin/delete'));
//文章列表页面路由
admin.get('/article',require('./admin/article'));
//文章编辑路由
admin.get('/article-edit',require('./admin/article-edit'));
//实现文章添加功能的路由
admin.post('/article-add',require('./admin/article-add'));
//将路由对象作为模块成员进行导出
module.exports=admin;
