var express=require('express');
var mongoose=require('mongoose');
var app=express();
var route=require('./routes/route');
app.use('/api',route);
mongoose.connect('mongodb://localhost:27017/blog');
mongoose.connection.on('connected',function(){
    console.log("Mongo Db connected");
});
mongoose.connection.on('error',function(err){
    if(err){
        console.log(''+err);
    }
});






app.listen(3000,function(){
    console.log('Server running in the port 3000');
})