import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InsertpostComponent } from './insertpost/insertpost.component';
import { PostwallComponent } from './postwall/postwall.component';
import { ViewpostComponent } from './viewpost/viewpost.component';
import { ViewpostresolveService } from './viewpost/viewpostresolve.service';
import { LoginComponent } from './login/login.component';
import { PostwallService } from './postwall/postwall.service';
import { UserresolverService } from './postwall/userresolver.service';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { UploadphotoComponent } from './uploadphoto/uploadphoto.component';

const approutes: Routes=[
  {
    path:'insertpost',component:InsertpostComponent,
  },
  {
    path:'home',component:HomeComponent
    
  },
  {
    path:'home/:userid', component:PostwallComponent,
    resolve:{
      posts:PostwallService,
      user:UserresolverService
    }
  },
  {
    path:'about/:userid',component:AboutComponent,
    resolve:{
       user:UserresolverService
    }
  },
  {
    path:'viewpost/:id',component:ViewpostComponent,
    resolve:{
      post:ViewpostresolveService
    }
  },
  {
    path:'viewpost',
    redirectTo:'postwall'
  },
  {
    path:'login',
    component:LoginComponent
  },
 {
   path:'register',
   component:RegisteruserComponent
 },{
   path:'upload',
   component:UploadphotoComponent
 }
];
@NgModule({
  declarations: [
    AppComponent,
    InsertpostComponent,
    PostwallComponent,
    ViewpostComponent,
    LoginComponent,
    AboutComponent,
    HomeComponent,
    RegisteruserComponent,
    UploadphotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(approutes),
  ],
  providers: [ViewpostresolveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
