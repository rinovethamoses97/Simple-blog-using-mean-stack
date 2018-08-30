var mongoose=require('mongoose');
var commentSchema=mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    postid:{
        type:String,
        required:true,
    }
});
var comment=module.exports=mongoose.model('comment',commentSchema);