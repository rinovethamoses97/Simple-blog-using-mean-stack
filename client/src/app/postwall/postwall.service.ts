import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Resolve,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../login/login.service';
@Injectable({
  providedIn: 'root'
})
export class PostwallService implements Resolve<any> {
 
  constructor(private http:HttpClient,private loginservice:LoginService ) {}
  resolve(route:ActivatedRouteSnapshot,rstate:RouterStateSnapshot):Observable<any>{
    console.log(route.params["userid"]);
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.getPosts(route.params["userid"]);
  }
  
  getPosts(userid){
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post("http://localhost:3000/api/getposts",{userid:userid},{headers:headers});
  }
}
