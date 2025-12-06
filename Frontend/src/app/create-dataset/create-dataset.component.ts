import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PythonApisService } from '../python-apis.service';
import { Router } from '@angular/router';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-create-dataset',
  templateUrl: './create-dataset.component.html',
  styleUrls: ['./create-dataset.component.css']
})
export class CreateDatasetComponent {

  uploadedFiles:any
  selectedFile:any;
  fileName:any;

  isLoading:any=false;

  serviceResp:any;
  cleanedDataResp:any;
  describeDataResp:any="";
  chartsFileResp:any="";
  generatePropsResp:any="";
  algoResultResp:any="";
  

  data_elements:any = []

  img1:any=null;
  img2:any=null;
  img3:any=null;
  img4:any=null;
  img5:any=null;
  img6:any=null;
  img7:any=null;
  img8:any=null;
  img9:any=null;
  img10:any=null;
  img11:any=null;
  img12:any=null;
  img13:any=null;
  constructor(private http: HttpClient,public apiService:PythonApisService,private route: Router)
    {}


  selectFiles(event:any) {
    //  console.log(event.target['files'][0]| null);
      this.selectedFile= event.target.files[0];
      this.fileName= event.target.files[0].name;
  
    }


    uploadFile(){
      this.isLoading=true;
      console.log("Selected File Name::"+this.selectedFile);
      console.log(this.fileName);
      const formData: FormData = new FormData();
    
        let url="http://localhost:5000/upload"; 
    
        formData.append("files",this.selectedFile,this.fileName);
        this.http.post(url, formData)
        .subscribe(data => {
          console.log(data);
           this.cleanedFile();
           console.log("Cleaned Data::"+this.cleanedDataResp)
        if(JSON.parse(JSON.stringify(data)).status=='success')
        {
          if(this.cleanedDataResp=='success')
          {
           this.serviceResp='SUCCESS';
          }
          else
          {
            this.serviceResp='SUCCESS';
          }
        }
        else
        {
          this.serviceResp='FAILED';
        }
        
          console.log("Response::"+this.serviceResp);
          this.isLoading=false;
        },err=>{
          // ret_result=err.toString; 
          console.log(err);
          this.serviceResp=err.toString; 
          });  
    }



    downloadFile()
    {
      let fName=this.fileName.substring(0,this.fileName.indexOf("."));
      console.log("fName:"+fName);
      let url="http://localhost:5000/download/"+fName; 
      this.http.get(url,{ responseType: 'blob' }).subscribe((data:any)=>{
        saveAs(data,fName+".csv");
      },error=>{
        console.log(error);
      });
    }

    downloadFileExcel()
    {
      let fName=this.fileName.substring(0,this.fileName.indexOf("."));
      console.log("fName:"+fName);
      let url="http://localhost:5000/download/"+fName; 
      this.http.get(url,{ responseType: 'blob' }).subscribe((data:any)=>{
        saveAs(data,fName+".xlsx");
      },error=>{
        console.log(error);
      });
    }


    downloadResultExcel()
    {
   //   let fName=this.fileName.substring(0,this.fileName.indexOf("."));
   //   console.log("fName:"+fName);
      let url="http://localhost:5000/downloadresult"; 
      this.http.get(url,{ responseType: 'blob' }).subscribe((data:any)=>{
        saveAs(data,"_Result.xlsx");
      },error=>{
        console.log(error);
      });
    }





    cleanedFile(){
        let url="http://localhost:5000/cleaned/"+this.fileName.substring(0,this.fileName.indexOf("."))
        var retValue:string;
        this.http.get(url)
        .subscribe(data => {
          this.cleanedDataResp=JSON.parse(JSON.stringify(data)).status;
          console.log("Data:"+this.cleanedDataResp);
        },err=>{
          this.cleanedDataResp=err.toString; 

          });  
          console.log("Return value::"+this.cleanedDataResp)

    }

    generateEDA()
    {
      this.describeFile();
    }

    generateChart()
    {
      this.chartFile();
    }

    describeFile(){
      this.describeDataResp='success';
     /* let url="http://localhost:5000/describe/"+this.fileName.substring(0,this.fileName.indexOf("."))
      var retValue:string;
      this.http.get(url)
      .subscribe(data => {
        console.log("describe")
        console.log(data)
        this.describeDataResp=JSON.parse(JSON.stringify(data)).status;
        this.data_elements=JSON.parse(JSON.stringify(data)).Column_Data;
        console.log("No of rows::"+JSON.parse(JSON.stringify(data)).No_Rows)
        console.log("Describe file status:"+this.describeDataResp);
      },err=>{
        this.describeDataResp=err.toString; 

        });  
        console.log("Return value::"+this.describeDataResp) */

  }

  describeGenerateProp(){
    this.generatePropsResp='success';
  }

  chartFile(){
    this.chartsFileResp='success';
    this.img1="assets/graph/graph_1.png"
    this.img2="assets/graph/graph_2.png"
    this.img3="assets/graph/graph_3.png"
    this.img4="assets/graph/graph_4.png"
    this.img5="assets/graph/graph_5.png"
    this.img6="assets/graph/graph_6.png"
    this.img7="assets/graph/graph_8.png"
    this.img8="assets/graph/seaborn_plot_1.png"
    this.img9="assets/graph/seaborn_plot_2.png"
    this.img10="assets/graph/seaborn_plot_3.png"
    this.img11="assets/graph/seaborn_plot_4.png"
    this.img12="assets/graph/seaborn_plot_5.png"
    this.img13="assets/graph/seaborn_plot_6.png"
    /*   let url="http://localhost:5000/charts/"+this.fileName.substring(0,this.fileName.indexOf("."))
    var retValue:string;
    this.http.get(url)
    .subscribe(data => {
      console.log("charts")
      console.log(data)
      this.chartsFileResp=JSON.parse(JSON.stringify(data)).status;
      this.img1="assets/graph/graph_1.png"
      this.img2="assets/graph/graph_2.png"
      this.img3="assets/graph/graph_3.png"
      this.img4="assets/graph/graph_4.png"
      this.img5="assets/graph/graph_5.png"
      this.img6="assets/graph/graph_6.png"
      this.img7="assets/graph/graph_8.png"
      this.img8="assets/graph/seaborn_plot_1.png"
      this.img9="assets/graph/seaborn_plot_2.png"
      this.img10="assets/graph/seaborn_plot_3.png"
      this.img11="assets/graph/seaborn_plot_4.png"
      this.img12="assets/graph/seaborn_plot_5.png"
      this.img13="assets/graph/seaborn_plot_6.png"
    },err=>{
      this.chartsFileResp=err.toString; 

      });  
      console.log("Return value::"+this.chartsFileResp)  */

}


generateResult()
{
  this.algoResultResp='success';
  }
}
//this code is written by Zunaira