import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css','../postwall/vendor/bootstrap/css/bootstrap.min.css','../postwall/css/blog-home.css']
})
export class AboutComponent implements OnInit {
  user:{
    _id:String;
    name:String;
    email:String;
    phone:String;
  };
  constructor(private activatedrouter:ActivatedRoute) {
    this.activatedrouter.data.subscribe((res)=>{
        this.user=res.user[0];
    })
   }

  ngOnInit() {
  }

}
