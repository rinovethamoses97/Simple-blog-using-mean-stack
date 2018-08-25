import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ViewpostresolveService implements Resolve<any> {
  id:String;
  constructor(private http:HttpClient) { }
  resolve(route:ActivatedRouteSnapshot,rstate:RouterStateSnapshot):Observable<any>{
    console.log(route.params["id"]);
    this.id=route.params["id"];
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post("http://localhost:3000/api/getpost",{id:this.id},{headers:headers});
  }
}
