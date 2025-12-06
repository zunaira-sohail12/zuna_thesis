import { Component, OnInit } from '@angular/core';
import {PythonApisService} from 'src/app/python-apis.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  title = 'ChatBot';
  answer:any;
  test_service:any;
  msg_seq=0;
  elements:any=[];
  questt:any="";
  
  chat:any=[];
  answ:any=[];
  ques:any=[];
  chat_dt:any;

  username:any;
  constructor(public apiService:PythonApisService){}
  currentDate : Date = new Date();  
  
  ngOnInit() { 
   // console.log("Test"+this.apiService.callTestService());
   // this.test_service=this.apiService.callTestService();
   this.clearData();
   this.username=sessionStorage.getItem("username");
  this.call_test();
  //this.chat_dt=this.date;
  } 
  
  /*callService()
  {
    this.test_service=this.apiService.callTestService();
  } */
  
  saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  getData(key: string) {
    return localStorage.getItem(key)
  }
  removeData(key: string) {
    localStorage.removeItem(key);
  }
  clearData() {
    localStorage.clear();
  }
  getAllData(){
   // return JSON.stringify(localStorage);
    var obj = JSON.parse(JSON.stringify(localStorage));
    var res = [];
     
    for(var i in obj)
        res.push(obj[i]);
  }
  call_test()
  {
    this.apiService.callTestService().subscribe(data=>{
      this.test_service= JSON.parse(JSON.stringify(data)).status;
      console.log(data);
    },err=>{
      this.test_service=err;
    console.log(err);
    });
  }
  
  call_api(ques_text:any)
  {
  //  let ret_result:any;
    this.apiService.callPythonService(ques_text).subscribe(data=>{
      const obj = JSON.parse(JSON.stringify(data));
   //   ret_result=obj.trans;
   //this.answer=obj.result;
   this.answer=obj.result;
   console.log(this.answer)
   console.log(data);
  
  },err=>{
  this.answer=err.toString;
  // ret_result=err.toString; 
  console.log(err);
  }
  );
  }
  
  
  selectFiles(event:any) {
  //  this.progressInfos = [];
  // this.selectedFiles = event.target.files;
  //  console.log(this.selectedFiles);
  //  this.uploadedFiles={count:this.i,fileTitle:fileTitle,fileName:event.target.files[0],origName:event.target.files[0].name};
  //   this.cookieService.set('files-'+this.i,this.uploadedFiles[this.i]);
  //  console.log(this.i);
    this.apiService.uploads(event);
  }
  
  sendMessage(question:any) {
    this.chat.push(question);
    //  this.progressInfos = [];
    // this.selectedFiles = event.target.files;
    //  console.log(this.selectedFiles);
    //  this.uploadedFiles={count:this.i,fileTitle:fileTitle,fileName:event.target.files[0],origName:event.target.files[0].name};
    //   this.cookieService.set('files-'+this.i,this.uploadedFiles[this.i]);
    //  console.log(this.i);
    this.questt = '';
    this.msg_seq++;
    this.saveData(this.msg_seq.toString(),question);
    console.log(this.msg_seq);
    this.answer='Hello Zunaira Sohail';
    this.chat.push(this.answer);
    this.ques.push(question);
    console.log(this.getAllData());
    this.elements=this.getAllData();
    ///// this.answer=this.apiService.getData(question);
    }
  


  sendingMsg(question:any)
{
  this.chat.push(question);

  this.questt = '';
  this.msg_seq++;
  this.saveData(this.msg_seq.toString(),question);
  console.log(this.msg_seq);
 // this.answer='Hello Zunaira Sohail';
  this.chat.push(this.getMessages(question));
  this.ques.push(question);
 // console.log(this.getAllData());
 // this.elements=this.getAllData();
}

    getMessages(quest:any)
    {
    // return this.getData(this.msg_seq.toString());
    console.log(quest);
    console.log(this.apiService.getMsg(quest));  
    return this.apiService.getMsg(quest);  
  }
  
  }
  
