import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PythonApisService} from './python-apis.service';
import { UserComponent } from './user/user.component';
import { ChatComponent } from './chat/chat.component';
import { CreateDatasetComponent } from './create-dataset/create-dataset.component'
import { FileSaverModule } from 'ngx-filesaver';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChatComponent,
    CreateDatasetComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FileSaverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
