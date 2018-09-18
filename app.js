var express=require('express');
var mongoose=require('mongoose');
var app=express();
var route=require('./routes/route');
app.use('/api',route);
mongoose.connect('mongodb://rino:rino1234@ds161312.mlab.com:61312/a2zblog'); //for Mlab db
//mongoose.connect('mongodb://localhost:27017/blog'); //for local db
mongoose.connection.on('connected',function(){
    console.log("Mongo Db connected");
});
mongoose.connection.on('error',function(err){
    if(err){
        console.log(''+err);
    }
});





var http = require("http");
var server = http.createServer(app);
var port = Number(process.env.PORT || 3000);
server.listen(port);
// app.listen(3000,function(){
//     console.log('Server running in the port 3000');
// })