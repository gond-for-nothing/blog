const {User}=require('../../model/user');
const bcrypt =require('bcrypt');
module.exports=async (req,res,next)=>{
   //接收客户端传来的参数
    const body = req.body;
   //要修改的用户的id
    const id =req.query.id;

    let user =await User.findOne({_id:id});
    //密码比对
    const isValue = await bcrypt.compare(req.body.password,user.password);
    //密码比对成功
    if(isValue){
        res.send('密码比对成功');
        //将用户信息更新到数据库中
        User.updateOne({_id:id},{
            username:req.body.username,
            email:req.body.email,
            role:req.body.role,
            state:req.body.state
        })
    }
    else{
    //密码比对失败
    let obj ={path:'/admin/user-edit',message:'密码比对失败，不能进行用户信息的修改',id:id};
    next(JSON.stringify(obj));
    }
}