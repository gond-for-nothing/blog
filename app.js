//引用express框架
const express=require('express');
//引用path模块
const path=require('path');
//导入express-session模块
const session=require('express-session')
//导入body-parser模块(加密密码)
const bodyPaser=require('body-parser');
//导入formidable模块
const formidable=require('formidable');
//连接数据库
require('./model/connect');



//创建网站服务器
const app =express();
//处理post请求参数(普通数据，二进制数据不可以)
app.use(express.json()) ;
app.use(express.urlencoded({ extended: false }))
//配置session
app.use(session({secret:'secret key'}));

//告诉express框架模板所在位置
app.set('views',path.join(__dirname,'views'));
//告诉express框架模板的默认后缀是什莫
app.set('view engine','art');
//当渲染模板后缀为art的模板时，所用的模板引擎是啥
app.engine('art',require('express-art-template'));
//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')))

//引入路由对象
const home=require('./route/home');
const admin=require('./route/admin');

//拦截请求，判断用=用户登录状
app.use('/admin',require('./middleware/loginGuard'));


//为路由匹配请求路径
app.use('/home',home);
app.use('/admin',admin);

//错误处理中间件
app.use( (err,req,res,next)=>{
    //将字符串对象转换为对象类型
    //JSON.parse()
    let params=[];
    const result=JSON.parse(err);
    for (let arrt in result){
        if(arrt!='path'){
            params.push(arrt+'='+result[arrt]);
        }

    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

//监听端口
app.listen(80);
console.log('网站服务器启动成功，请访问localhost');