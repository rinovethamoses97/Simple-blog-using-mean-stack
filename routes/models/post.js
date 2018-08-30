var mongoose=require('mongoose');
var postSchema=mongoose.Schema({
    date:{
        type: Date, 
        default: Date.now,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    }
    
});
var post=module.exports=mongoose.model('post',postSchema);