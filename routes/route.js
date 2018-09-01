var mongoose=require('mongoose');
var express=require('express');
var bodyparser=require('body-parser');
var cors=require('cors');
var router=express.Router();
router.use(cors());
router.use(bodyparser.json());
var post=require('./models/post');
var user=require('./models/user');
var comment=require('./models/comment');
router.post('/insertpost',function(req,res){
    var newpost=new post({
        date:new Date(),
        time:req.body.time,
        title:req.body.title,
        content:req.body.content,
        category:req.body.category,
        userid:req.body.userid
    });
    newpost.save(function(err){
        if(err){
            res.send({msg:'failed'});
        }
        else{
            res.send({msg:'success'});
        }
    });
});
router.post('/createuser',function(req,res){
    var newuser=new user({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
    })
    newuser.save(function(err){
        if(err){
            res.send({msg:"failed"});
        }
        else{
            res.send({msg:"success"});
        }
    });
}); 
router.post('/getposts',function(req,res){
    post.find({userid:req.body.userid},function(err,posts){
        res.json(posts);
    })
});
router.post('/getUser',function(req,res){
    user.find({_id:req.body.userid},function(err,users){
        res.json(users);
    });
});
router.post('/finduser',function(req,res){
    user.find({email:new RegExp('^'+req.body.useremail+'', 'i')},function(err,users){
        res.json(users);
    })
})
router.post('/checkuser',function(req,res){
    user.find({email:req.body.email},function(err,users){
        res.json(users);
    })
})

router.post('/getpost',function(req,res){
    post.find({_id:req.body.id},function(err,posts){
        //res.json(posts);
        comment.find({postid:req.body.id},function(err,comments){
            var temp={
                post:posts,
                comment:comments,
            }
            res.json(temp);
        })

    })
});
router.post('/insertcomment',function(req,res){
    var newcomment=new comment({
        comment:req.body.comment,
        postid:req.body.postid
    });
    newcomment.save(function(err){
        if(err){
            res.send({msg:'failed'});
        }
        else{
            res.send({msg:'success'});
        }
    });

})
router.post('/login',function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    user.findOne({email:email,password:password},function(err,users){
        if(err){
            res.json({msg:"Error"});
        }
        else{
            if(users){
                res.json({data:users,msg:"success"});
            }
            else{
                res.json({msg:"failed"});
            }
            
        }
    })
})

module.exports=router;
