//引入mongoose模块
const mongoose=require('mongoose')
//创建文章集合规则
const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        maxlength:20,
        minlength:4,
        required:[true,'请填写文章标题']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,//数据库中独有的类型
        ref:'Uesr',
        required:[true,'请填写作者']
    },
    publishDate:{
        type:Date,
        default:Date.now
    },
    cover:{
        type:String,
        default:null
    },
    content:{
        type:String
    }
})
//根据规则创建集合
const Article= mongoose.model('Article');
//将集合规则作为模块成员进行导出
module.exports=[
    Article
]