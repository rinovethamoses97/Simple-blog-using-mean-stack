import { Component, OnInit, Input} from '@angular/core';
import {PostwallService} from '../postwall/postwall.service'
import { ActivatedRoute} from '@angular/router';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import {post} from '../postwall/post';
import {ViewpostresolveService} from './viewpostresolve.service';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { comment } from './comment';
@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css','./vendor/bootstrap/css/bootstrap.min.css','./css/blog-home.css']
})
export class ViewpostComponent implements OnInit {
  _id:String;
  post:post;
  title:String;
  t:String;
  commentform:FormGroup;
  comment:FormControl;
  comments:comment[];
  constructor(private postwallservice:PostwallService,private router:ActivatedRoute,private viewpostservice:ViewpostresolveService) {
     this.router.data.subscribe((res)=>{
        console.log(res);
        this.post=res.post.post[0];
        this.comments=res.post.comment;
     })
   }
  createformcontrol(){
    this.comment=new FormControl('');
  }
  createform(){
    this.commentform=new FormGroup({
      comment:this.comment,
    })
  }
  ngOnInit() {
    this.createformcontrol();
    this.createform();
  }
  submitcomment(){
    if(this.commentform.valid){
      var comment={
        comment:this.commentform.value.comment,
        postid:this.post._id,
      };
      this.viewpostservice.insertcomment(comment).subscribe((data:any)=>{
         if(data.msg=="success"){
            alert("Comment posted Succesfully");
            this.comments.push(this.commentform.value);
            this.commentform.reset();
         }
         else{
            alert("Failed");
         }
      });
    }
  }
 
}
