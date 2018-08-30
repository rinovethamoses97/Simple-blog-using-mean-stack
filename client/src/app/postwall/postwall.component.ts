import { Component, OnInit } from '@angular/core';
import{PostwallService} from './postwall.service';
import {post} from './post';
import { Router,ActivatedRoute } from '@angular/router';
import {LoginService} from '../login/login.service';
@Component({
  selector: 'app-postwall',
  templateUrl: './postwall.component.html',
  styleUrls: ['./postwall.component.css','./vendor/bootstrap/css/bootstrap.min.css','./css/blog-home.css'],
})
export class PostwallComponent implements OnInit {
  posts:post[];
  category=new Set<String>(['All']);
  userid:String;
  user:{
    _id:String,
    email:String,
    name:String,
    phone:String,
    password:String,
  }
  constructor(private postwallservice:PostwallService,private router:Router,private activatedrouter:ActivatedRoute,private loginservice:LoginService) {
    this.userid=activatedrouter.snapshot.params["userid"];
    this.activatedrouter.data.subscribe((res)=>{
       console.log(res);
       this.posts=res.posts;
       this.user=res.user[0];
       for(var i in this.posts){
         this.category.add(this.posts[i].category);
       }
   })
  }

  ngOnInit() {
    
  }
  setContent(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.router.navigate(['/viewpost',value]);
  }
  filterbycategory(event){
    event.preventDefault();
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.postwallservice.getPosts(this.userid)
    .subscribe((data:any) => {
      console.log(data);
      this.posts=data;
      if(value!="All"){
        for(var i=0;i<this.posts.length;i++){
          if(this.posts[i].category!=value){
              this.posts[i]._id=null;
          }
        }
      }
    });
  }
}
