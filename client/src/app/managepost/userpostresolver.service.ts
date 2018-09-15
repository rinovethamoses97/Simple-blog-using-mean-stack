import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Resolve,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../login/login.service';
import { PostwallService } from '../postwall/postwall.service';
@Injectable({
  providedIn: 'root'
})
export class UserpostresolverService implements Resolve<any> {

  constructor(private postwallservice:PostwallService,private http:HttpClient) { }
  resolve(route:ActivatedRouteSnapshot,rstate:RouterStateSnapshot):Observable<any>{
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.postwallservice.getPosts(localStorage.getItem("id"));
  }
  deletepost(id){
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post("http://localhost:3000/api/deletepost",{id:id},{headers:headers}); 
  }
}
