//导入用户集合构造函数
const {User}=require('../../model/user')
const user= async (req,res)=>{
    //接收客户端传递过来的页面参数
    let page=req.query.page||1;
    //每一页显示的数据条数；
    let pagesize=8;
    //查询用户数据的总数
    let count = await User.countDocuments({});
    //总页数
    let total=Math.ceil(count/pagesize);
    //页码对应的数据查询开始位置
    let start=(page-1)*pagesize;
   
    //将用户信息从数据库中查询出来
let users=await User.find({}).limit(pagesize).skip(start);
// res.send(users)
    res.render('admin/user',{
        users:users,
        page:page,
        total:total});
}
module.exports = user;