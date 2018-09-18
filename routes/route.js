var mongoose=require('mongoose');
var express=require('express');
var bodyparser=require('body-parser');
var cors=require('cors');
var nodemailer=require('nodemailer');
var router=express.Router();
router.use(cors());
router.use(bodyparser.json());
var post=require('./models/post');
var user=require('./models/user');
var comment=require('./models/comment');
var IncomingForm = require('formidable');
var fs=require('fs');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'a2zblogadmimail@gmail.com',
      pass: 'blog1234'
    }
    });
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
              var mailOptions = {
                from: 'a2zblogadminmail@gmail.com',
                to: req.body.email,
                subject: 'Registration Success from A2Z blog',
                text: 'Thank you for registering to A2Z. Happy Bloggin'
              }; 
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  res.send({msg:"success"});
                }
              });
        }
    });
}); 
router.post('/getposts',function(req,res){
    post.find({userid:req.body.userid},function(err,posts){
        res.json(posts);
    })
});
router.post('/updatepost',function(req,res){
    post.findByIdAndUpdate(req.body.id,{title:req.body.title,content:req.body.content},function(err,post){
        if(!err){
            res.send({msg:"success"});
        }
        else{
            res.send({msg:"failed"});
        }
    })
})
router.post('/deletepost',function(req,res){
    post.findByIdAndRemove(req.body.id,function(err){
        if(!err){
            res.send({msg:"success"});
        }
        else{
            res.send({msg:"failed"});
        }
    })
})
router.post('/updatelinkedinid',function(req,res){
   console.log(req.body);
   user.findByIdAndUpdate(req.body.userid,{linkedinid:req.body.linkedinid},function(err,user){
       if(!err){
           res.send({msg:"success"});
       }
       else{
           res.send({msg:"failed"});
       }
   })
})
router.post('/upload',function(req,res){
    
    var form = new IncomingForm();
    // form.on('fileBegin', function (name, file){
    //     file.path = "C:/Users/RinoVM/Desktop/Rino_Blog/client/src/assets"+ '/uploads/' + "profile"+file.name+".jpeg";
    // });
    // form.on('field', function(name, value) {
    //     console.log(name);
    // });
    // form.on('end', () => {
    //     // res.json();
    //     res.send({msg:"success"});
    // });
    // form.parse(req);
    form.parse(req, function (err, fields, files) {
        var oldpath = files.file.path;
        var newpath = "C:/Users/RinoVM/Desktop/Rino_Blog/client/src/assets"+ '/uploads/' + "profile"+files.file.name+".jpeg";
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.send({msg:"success"});
        });
        });
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
