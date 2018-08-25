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
const approutes: Routes=[
  {
    path:'insertpost',component:InsertpostComponent,
  },
  {
    path:'postwall', component:PostwallComponent,
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
  }
];
@NgModule({
  declarations: [
    AppComponent,
    InsertpostComponent,
    PostwallComponent,
    ViewpostComponent
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
