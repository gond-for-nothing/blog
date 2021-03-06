const {User}=require('../../model/user');
module.exports= async (req,res)=>{
    //标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink='user';
 //获取到地址栏的id参数
 const { message,id}= req.query;
 //如果当前传了id，说明是修改成操作
 if(id){
//修改操作
let user =await User.findOne({_id:id});
//渲染用户编辑页面
res.render('admin/user-edit',{
    message:message,
    user:user,
    link:'/admin/user-modify?id='+id,
    button:'修改'
});
 }else{
    res.render('admin/user-edit',{
        message:message,
        link:'/admin/user-edit',
        button:'添加'
    });
 }
    
    
    res.render('admin/user-edit',{message});

}