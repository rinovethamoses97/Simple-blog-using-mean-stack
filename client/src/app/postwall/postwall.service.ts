import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostwallService {
 
  constructor(private http:HttpClient ) {}
  getPosts(){
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post("http://localhost:3000/api/getposts",{headers:headers});
  }
}
