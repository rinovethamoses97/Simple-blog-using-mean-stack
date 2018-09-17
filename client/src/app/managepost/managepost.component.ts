import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service'
import { Router, ActivatedRoute } from '@angular/router';
import { post } from '../postwall/post';
import { UserpostresolverService } from './userpostresolver.service';
import { FormControl } from '@angular/forms';
import { InsertpostService } from '../insertpost/insertpost.service';
@Component({
  selector: 'app-managepost',
  templateUrl: './managepost.component.html',
  styleUrls: ['./managepost.component.css','../postwall/vendor/bootstrap/css/bootstrap.min.css','../postwall/css/blog-home.css']
})
export class ManagepostComponent implements OnInit {

  userid:String;
  posts:post[];
  title:String;
  content:String;
  id:String;
  constructor(private loginservice:LoginService,private route:Router,private activaterouter:ActivatedRoute,private userpostservice:UserpostresolverService,private insertpostservice:InsertpostService) {
    var temp=this.loginservice.getId();
      this.userid=temp.id;
      if(temp.msg=="success"){
        //nothing
      }
      else{
         this.route.navigate(['login']);
      }
      this.activaterouter.data.subscribe((res)=>{
          this.posts=res.posts;
      })
   }

  ngOnInit() {
  }
  update(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.id=value;
    for(var i in this.posts){
      if(this.posts[i]._id==value){
        this.title=this.posts[i].title;
        this.content=this.posts[i].content;
        return;
      }
    }
  }
  delete(event){
    if((confirm("Are you sure want to delete?"))){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.userpostservice.deletepost(value).subscribe((data:any)=>{
      if(data.msg=="success"){
        for(var i in this.posts){
          if(this.posts[i]._id==value){
             this.posts[i]=null;
             alert("Deleted");
             return;
          }
        }
      }
      else{
        alert("Failed");
      }
    })
    }
  }
  submitpost(){
     this.insertpostservice.updatepost(this.id,this.title,this.content).subscribe((data:any)=>{
        if(data.msg=="success"){
           alert("Updated");
           for(var i in this.posts){
             if(this.posts[i]._id==this.id){
                this.posts[i].title=this.title;
                this.posts[i].content=this.content;
                return;
             }
           }
        }
        else{
          alert("failed");
        }
     })
  }
}
