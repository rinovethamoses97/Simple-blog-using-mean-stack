import { Component, OnInit } from '@angular/core';
import{PostwallService} from './postwall.service';
import {post} from './post';
import { Router } from '@angular/router';
@Component({
  selector: 'app-postwall',
  templateUrl: './postwall.component.html',
  styleUrls: ['./postwall.component.css','./vendor/bootstrap/css/bootstrap.min.css','./css/blog-home.css'],
})
export class PostwallComponent implements OnInit {
  posts:post[];
  category=new Set<String>(['All']);
  constructor(private postwallservice:PostwallService,private router:Router) {}

  ngOnInit() {
    this.postwallservice.getPosts()
    .subscribe((data:any) => {
      this.posts=data;
      for(var i in this.posts){
         
         this.category.add(this.posts[i].category);
      }
      
    });
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
    this.postwallservice.getPosts()
    .subscribe((data:any) => {
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
