//引入formidable第三方模块
const formidable=require('formidable');
const path=require('path');
module.exports=(req,res)=>{
   //创建表单解析对象
   const form = new formidable.IncomingForm();
   //配置上传文件的存放位置
   form.uploadDir=path.join(__dirname,'../','../','public','uploads');
   //保存上传文件的后缀
   form.keepExtensions=true;
   //解析表单
   form.parse(req,(err,fields,files)=>{
    // err错误对象，如果表单解析失败 err里面存储的是错误信息，解析成功err为null
    // fields存储普通请求参数null对象类型 保存普通表单数据
    //files存储上传的文件信息 对象类型 
    res.send(files);
});
}