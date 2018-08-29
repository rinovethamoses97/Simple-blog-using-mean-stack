var mongoose=require('mongoose');
var userSchema=mongoose.Schema({
    email:{
        type: String, 
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    }
    
});
var user=module.exports=mongoose.model('user',userSchema);