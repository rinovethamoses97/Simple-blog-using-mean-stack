var mongoose=require('mongoose');
var express=require('express');
var bodyparser=require('body-parser');
var cors=require('cors');
var router=express.Router();
router.use(cors());
router.use(bodyparser.json());
var post=require('./models/post');
router.post('/insertpost',function(req,res){
    var newpost=new post({
        date:new Date(),
        time:req.body.time,
        title:req.body.title,
        content:req.body.content,

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
router.post('/getposts',function(req,res){
    post.find(function(err,posts){
        res.json(posts);
    })
});
router.post('/getpost',function(req,res){
    post.find({_id:req.body.id},function(err,posts){
        res.json(posts);
    })
});


module.exports=router;
