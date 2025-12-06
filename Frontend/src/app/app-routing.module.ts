import { NgModule } from '@angular/core';
import {Routes,RouterModule,Router} from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { CreateDatasetComponent } from './create-dataset/create-dataset.component';
import { LoginComponent } from './login/login.component';

const routes:Routes=[
  {
    path:'chat',
    component:AppComponent
  },
  {
    path:'account',
    component:UserComponent
  },
  {
    path:'3D-step-system',
    component:CreateDatasetComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//this code is written by Zunaira