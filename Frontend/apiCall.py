import json
import mysql.connector
import os
import time

import requests
from requests.auth import HTTPBasicAuth
from flask_cors import CORS, cross_origin
from flask import Flask, request,jsonify
from werkzeug.utils import secure_filename
#import urllib.request as urllib2
from requests_toolbelt.multipart.encoder import MultipartEncoder
import datetime

import urllib3
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from bs4 import BeautifulSoup
import tldextract

# Initialize the bot and dispatcher
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError, PendingRollbackError
from sqlalchemy.orm import sessionmaker, declarative_base, scoped_session

app = Flask(__name__)
cors = CORS(app)



mysqldb=mysql.connector.connect(host="127.0.0.1",user="zunaira",password="zunaira1234")#established connection  

app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_RECORD_QUERIES"] = True
 
UPLOAD_FOLDER = 'D:\\NCI\\Customer Engagement for Artificial Intelligence\\Final Project\\Angular\\ChatBot\\src\\assets\\img';
TRAIN_UPLOAD_FOLDER='//home//zunaira//train_data';

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['TRAIN_UPLOAD_FOLDER'] = TRAIN_UPLOAD_FOLDER

@app.route("/data",methods=['POST'])
@cross_origin()   
def fetch_data():
    print(request.form.to_dict());
    print(request.form.to_dict()["zunaira"]);
    print(request.form.to_dict()["nuzhat"]);


@app.route("/msg",methods=['POST'])
@cross_origin()   
def get_data():
    api_url = 'https://api.chatpdf.com/v1/chats/message'
    headers={'x-api-key':'sec_aqyqlWcZ4GoYjGY7l1ZZLb3AYcDkHo5n'}
  # payload ={"sourceId": "src_j5StA2WxFUJJd5ZiTGexz","messages": [{"role": "user","content": "What is the scaling laws?"}]}
    record = json.loads(request.data);  
  # payload ={"sourceId": request.form.to_dict()["sourceId"],"messages": [{"role": "user","content": request.form.to_dict()['question']}]}
    payload ={"sourceId": record["sourceId"],"messages": [{"role": "user","content": record['question']}]}
    try:
        response = requests.post(api_url,json=payload,headers=headers)
        token1 = response.text
        print(response)
     #   return jsonify(response.text);
        return response.json();
    except Exception as e:
        print("The error is: ",e)

@app.route('/uploads', methods=['POST'])
@cross_origin()
def fileUpload():
    api_url = 'https://api.chatpdf.com/v1/sources/add-file'
    headers={'x-api-key':'sec_aqyqlWcZ4GoYjGY7l1ZZLb3AYcDkHo5n'}
    try:
        file = request.files.getlist('files')
        session = requests.Session()
  ##      print("Filename::"+file[0].filename);
  ##      data = {'file': open(file[0].filename, 'rb')}
  ##      response = requests.post(api_url, files=data, headers=headers )
        with open(file[0].filename, 'rb') as fobj:
            response = requests.post(api_url, headers=headers, files={'file': fobj})   
    #    client = APIClient()
        # client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
    #    response = client.post(api_url, data, format='multipart')
        print(response.text);
        return jsonify(response.text);
###        return jsonify(response.text);
    except Exception as e:
        print("The error is: ",e)
        return e;
    
    
    
@app.route('/uploading', methods=['POST'])
@cross_origin()
def fileUploading():
    api_url = 'https://api.chatpdf.com/v1/sources/add-file'
    headers={'x-api-key':'sec_aqyqlWcZ4GoYjGY7l1ZZLb3AYcDkHo5n'}

   
    file = request.files.getlist('files')
    print("filename::"+str(file));
   
    print(str(request.files))

  
    for f in file:
  #  filess={'file':open(file[0].filename,'rb')};
      filename = secure_filename(file[0].filename)
      f.save(os.path.join(app.config['TRAIN_UPLOAD_FOLDER'], filename))
 #   filess={'file':open('C:\\Users\\zunaira_\\Downloads\\en.pdf','rb')};
    filess={'file':open(TRAIN_UPLOAD_FOLDER+'//'+filename,'rb')};
    r=requests.post(api_url, headers=headers,files=filess);
 #   print(r.status_code);
 #   print(r.text);
   # return jsonify(r.text);
   # return jsonify({"sourceId": r.json['sourceId']});
    return r.json();


@app.route('/test', methods=['GET'])
@cross_origin()
def testApp():
    return jsonify({"status": "This is testing service"});


@app.route('/test2', methods=['GET'])
@cross_origin()
def testApp2():
    return jsonify({"status": "This is testing method 2"});


@app.route("/insert",methods=['POST'])   
def insert_data():
   record = json.loads(request.data)   
   return jsonify(create(record));   





@app.route('/upload_image/<user_id>', methods=['POST', 'GET'])
def uploadImage(user_id):
    if request.method == 'POST':
        file = request.files.getlist('files')
        filename = ""
        print(request.files, "....")
        for f in file:
            print(f.filename)
            filename = secure_filename(f.filename)
            file_extension = os.path.splitext(filename)
            print("name::"+str(user_id));
            print("file_extension::"+str(file_extension[1]));
            print("UPLOADED FOLDER::"+app.config['UPLOAD_FOLDER']);
            try:
                if(update(UPLOAD_FOLDER+"\\"+str(user_id)+str(file_extension[1]),str(user_id))==100):
                #if(('zunaira.jpg','100')==100):
                   #f.save(os.path.join(app.config['UPLOAD_FOLDER'],str(user_id)+""+str(file_extension[1])));
                   f.save(os.path.join(app.config['UPLOAD_FOLDER'],str(user_id)+str(file_extension[1])));
                else:
                    return jsonify({"status": "Error in updating the file"})
            except Exception as e:
                print(str(e));
          #  print(allowed_file(filename))
          #  if allowed_file(filename):
            
           # else:
           #     return jsonify({'message': 'File type not allowed'}), 400
        return jsonify({"name": filename, "status": "success","image_name":str(user_id)+str(file_extension[1])})
    else:
        return jsonify({"status": "Upload API GET Request Running"})


def create(data):
    ts = time.time()
    timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    try:
       mycursor=mysqldb.cursor();
       statement='insert into customer_engangement.chat_users (user_id,username,user_email,create_datetime,update_datetime,is_active) VALUES (%s,%s,%s,%s,%s,%s)';
       tuple1 =(int(data["user_id"]),data["username"],data["user_email"],timestamp,timestamp,'N');
       mycursor.execute(statement,(tuple1));
       mysqldb.commit();
       return {"ResponseCode":100,"ResponseDesc":"Success"};
    except Exception as e:
       mysqldb.rollback()  
       mysqldb.close()
       return {"ResponseCode":95,"ResponseDesc":str(e)}; 
       
def update(user_image,user_id):
    try:
       mycursor=mysqldb.cursor();
       mycursor.execute('update customer_engangement.chat_users set user_image=%s'+
       'where user_id=%s',(user_image,int(user_id)));
       mysqldb.commit();
       return 100;
    except Exception as e:
       mysqldb.rollback()  
       mysqldb.close()
       return 95;


def Scrap_web(url):
    response = urllib3.request("GET",url)
    extracted_info = tldextract.extract(url)
    soup = BeautifulSoup(response.data, "html.parser")
    # Extract the text content of the webpage
    text = soup.get_text()
    doc = SimpleDocTemplate(TRAIN_UPLOAD_FOLDER+"//"+extracted_info.domain+".pdf")
    styles = getSampleStyleSheet()
    flowables = []
    txt = text.replace("\n", " ")
    para = Paragraph(txt, style=styles["Normal"])
    flowables.append(para)
    doc.build(flowables)
    return extracted_info.domain+".pdf";

@app.route('/scrap', methods=['POST'])
@cross_origin()
def scrapping():
    api_url = 'https://api.chatpdf.com/v1/sources/add-file'
    headers={'x-api-key':'sec_aqyqlWcZ4GoYjGY7l1ZZLb3AYcDkHo5n'}
    print("URL::"+request.json["url"]);
    fileName=Scrap_web(request.json["url"]);

    filess={'file':open(TRAIN_UPLOAD_FOLDER+"//"+fileName,'rb')};
    r=requests.post(api_url, headers=headers,files=filess);
  #  print(r.status_code);
  #  print(r.text);
    return r.json();

if __name__ == '__main__':
    app.run()  # run our Flask app   