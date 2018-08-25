import { Component, OnInit, Input} from '@angular/core';
import {PostwallService} from '../postwall/postwall.service'
import { ActivatedRoute} from '@angular/router';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import {post} from '../postwall/post';
@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {
  _id:String;
  post:post;
  title:String;
  t:String;
  constructor(private postwallservice:PostwallService,private router:ActivatedRoute) {
     this.router.data.subscribe((res)=>{
       // this.post=res.post[0];
     })
   }
  ngOnInit() {
  }
 
}
