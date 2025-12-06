import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PythonApisService} from 'src/app/python-apis.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  createAcctResp:any; 
  createImgUploadResp:any; 

  uploadedFiles:any
  selectedFile:any;
  fileName:any;

  trainFile:any;
  trainFileName:any;

  image_name:any;

  createURLTrainResp:any; 
  createPDFTrainResp:any; 
  
  SourceId:any;
  constructor(private http: HttpClient,public apiService:PythonApisService,private route: Router){}

  selectFiles(event:any) {
  //  console.log(event.target['files'][0]| null);
    this.selectedFile= event.target.files[0];
    this.fileName= event.target.files[0].name;

  }


  selectTrainFiles(event:any) {
    //  console.log(event.target['files'][0]| null);
      this.trainFile= event.target.files[0];
      this.trainFileName= event.target.files[0].name;

    }

  saveAcccount(username:any,email:any){
 /// console.log("Filename::"+this.uploadedFiles.fileName);
    let userid = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  this.createAccount(username,email,userid);
//this.createImageUpload(this.uploadedFiles,userid);
console.log("Account Response:: "+this.createAcctResp);
//console.log("Image Response:: "+this.createImgUploadResp);
this.saveUsername("username",email);  
}

createAccount(username:any,email:any,userid:any){
  this.apiService.callCreateAccountService(username,email,userid)
  .subscribe(data=>{
    this.createAcctResp= JSON.parse(JSON.stringify(data));
    console.log(data);
  },err=>{
    //this.test_service=err;
  console.log(err);
  });
}
createImageUpload(event:any,userid:any){

    const formData: FormData = new FormData();

    let url="http://localhost:5000/upload_image/"+userid; 
    console.log("UserId::"+userid);
    console.log("File::"+this.uploadedFiles);
    formData.append("files",this.selectedFile,this.fileName);
    this.http.post(url, formData)
    .subscribe(data => {
      console.log(data);
      this.createImgUploadResp=JSON.parse(JSON.stringify(data));
      this.image_name=JSON.parse(JSON.stringify(data)).image_name;
      console.log("Image Name"+this.image_name);
    },err=>{
      // ret_result=err.toString; 
      console.log(err);
      });  

}
/////
createURLTrain(url:any){
  this.apiService.callURLTrain(url)
  .subscribe(data => {
    console.log(data);
    this.SourceId=JSON.parse(JSON.stringify(data)).sourceId;
    console.log("URL Response::"+this.createURLTrainResp);
  },err=>{
    // ret_result=err.toString; 
    console.log(err);
    });
}
///// http://localhost:5000/uploading
createPDFTrain(){
  console.log("Train File Name::"+this.trainFileName);
  console.log(this.trainFile);
  const formData: FormData = new FormData();

    let url="http://localhost:5000/uploading"; 

    formData.append("files",this.trainFile,this.trainFileName);
    this.http.post(url, formData)
    .subscribe(data => {
      console.log(data);
    //  this.createImgUploadResp=JSON.parse(JSON.stringify(data));
    //  this.createPDFTrainResp=JSON.parse(JSON.stringify(data)).sourceId;
    this.SourceId=JSON.parse(JSON.stringify(data)).sourceId;
      console.log("PDF Response::"+this.createPDFTrainResp);
    },err=>{
      // ret_result=err.toString; 
      console.log(err);
      });  
}

createTest()
{
  
  let url="http://localhost:5000/test2"; 
  this.http.get(url).subscribe(data => {
    this.createPDFTrainResp=JSON.parse(JSON.stringify(data)).status;
    console.log(this.createPDFTrainResp);
  },err=>{
    console.log(err);
  });
  
}


chatbot()
{
  this.route.navigate(['/chat']);
}

saveUsername(key:any,value:any)
{
  sessionStorage.setItem(key,value);

}

}