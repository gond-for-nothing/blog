
//引入joi
const Joi= require('joi');
const  mongoose = require('mongoose');
//导入bcrypt 
const bcrypt =require('bcrypt');
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    state:{
        type:Number,
        default:0
    }

})
//创建集合
const User=mongoose.model('Uesr',userSchema);

 async function createUser(){
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456',salt);
    const user = await User.create({
        username:'iteheima',
        email:'2052164719@qq.com',
        password:pass,
        role:'admin',
        state:0
    })

}

// createUser();
//验证用户信息
const  validateUser =user=>{
     //定义对象的验证规则
     const schema={
        username:Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email:Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合验证规则')),
        role:Joi.string().valid('normal','admin').required().error(new Error('角色不符合验证规则')),
        state:Joi.number().valid(0,1).required().error(new Error('状态值不符合验证规则'))
    };
        //实施验证
        return Joi.validate(user,schema);

}
//将用户集合做为模块成员进行导出
module.exports={
    User,
    validateUser
}