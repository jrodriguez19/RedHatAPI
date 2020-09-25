// Adding Express Web Server
const express = require('express');
const app = express();

// Adding Fetch fuction to NodeJS 
const fetch = require ('node-fetch');

// Adding Parameters nedded for Red Hat API interaction
const RHAPI = require('./config')


//Listening with express on port 3000 
app.listen(3000, ()=> console.log("LISTENING AT 3000-----------------------------------------------------------------------------------------------/////////////////")); 
app.use(express.static('Front')); app.use(express.json());


console.log('Ejecutando Fetch')

async function getAccessToken(){
  // Create the body of the HTTP via POST in type x-www-form-urlencoded because it doesn't accept JSON
  var urlencodedBody = new URLSearchParams();
  urlencodedBody.append("grant_type", "refresh_token");
  urlencodedBody.append("client_id", "rhsm-api");
  urlencodedBody.append("refresh_token", RHAPI.offline_token);
  try{
    const response = await fetch(RHAPI.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: urlencodedBody
  });
  const rtaJson = await response.json();
  console.log('TOKEN RECIBIDO DE REDHAT')
  //console.log(rtaJson.access_token)
  return rtaJson.access_token;

  }
  catch(err){
    console.log('Error in the call to the API:  ' + err)
  }
  
}


app.post('/', async (request, response) => {
  console.log('Recibi una request!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(request.body);
  tkn = await getAccessToken();
  response.json({'TUTOKEN' : tkn});
})


tt = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItNGVsY19WZE5fV3NPVVlmMkc0UXhyOEdjd0l4X0t0WFVDaXRhdExLbEx3In0.eyJleHAiOjE2MDA4NTA4NDUsImlhdCI6MTYwMDg0OTk0NSwiYXV0aF90aW1lIjoxNjAwMDYzODQ4LCJqdGkiOiJlMTZmNTMyZS03OGQ5LTQzMWYtYTRmZC0yMGE3YzQ4YmM1ZWIiLCJpc3MiOiJodHRwczovL3Nzby5yZWRoYXQuY29tL2F1dGgvcmVhbG1zL3JlZGhhdC1leHRlcm5hbCIsImF1ZCI6InJoc20tYXBpIiwic3ViIjoiZjo1MjhkNzZmZi1mNzA4LTQzZWQtOGNkNS1mZTE2ZjRmZTBjZTY6anJvZHJpZ3Vlem5Ac2ljZS5jb20uYXUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyaHNtLWFwaSIsInNlc3Npb25fc3RhdGUiOiIxZjhmZTBkMi04YWYwLTQ1NzMtYWQ5NS04ODVmNTVmOGIyOWIiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInBvcnRhbF9tYW5hZ2Vfc3Vic2NyaXB0aW9ucyIsIm9mZmxpbmVfYWNjZXNzIiwicG9ydGFsX21hbmFnZV9jYXNlcyIsImNhbmRsZXBpbl9zeXN0ZW1fYWNjZXNzX3ZpZXdfYWxsIiwicG9ydGFsX3N5c3RlbV9tYW5hZ2VtZW50IiwicG9ydGFsX2Rvd25sb2FkIl19LCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIiwiYWNjb3VudF9udW1iZXIiOiI1NjkzMTc4IiwiYWNjb3VudF9pZCI6Ijc5NDk5MDMiLCJuYW1lIjoiSm9yZ2UgUm9kcmlndWV6IiwicHJlZmVycmVkX3VzZXJuYW1lIjoianJvZHJpZ3Vlem5Ac2ljZS5jb20uYXUiLCJsb2NhbGUiOiJlbl9VUyIsImdpdmVuX25hbWUiOiJKb3JnZSIsImZhbWlseV9uYW1lIjoiUm9kcmlndWV6IiwiZW1haWwiOiJqcm9kcmlndWV6bkBzaWNlLmNvbS5hdSJ9.LapY6BXk0CFBvmeu6dkoK7qNGlXYCxsLux3GG33SKhJ5FvtxFUGa1AGKcEUUkrxLD22eFvHxd5wCHAnAX9zHgwW6C2Es9GTcNiOlPbssmlKISmOK2G-urrn0q4CW-HCAWRrARXiic1Q_6AtVKWZmIDliWbQIGCtbjst_KKXNAcCOau28-X25BhHEcZn3hxrcb3303m19vM4vN4A-cfGwLKgrFOjVnN1exY4FJ7eB5tHxYMicXq2iNlMfAc8DBNj_lk-NiPmtx7V2mtRTKO67dtd3T9DMLPr5amkaK0sj4zEXGqO0cZNxOcQ0HnXlMygHE-sLiQ9gXgW-BVByVdExHzAynZiN7kELsCmK3YTXxUgAoLB997btIyDNy1sBr1poQL3mT1OJ_Wm-4s-Bwv4FVek0ZTUITbTy1IKlXtxv52TXDXD9bgygDARP2RWSBcvKU1de4fWlPmEJ_5QDFO0KHE6uLANzE__-xayrcPy2trW7zRQED0ujVWZwr8Fb94zaS615EVvkwOAREBgufQzcmGL_1clooa9IxWQ_2kRpoPStvJk2m-yBWqPvwnqA1b_UgjqY0baDK9MKnz2sPrvcFxM5Ldoc7d4hPcnXMSIc4148dgdw2GLvBst0yT2QDybV67mhilWnfca7xji3E03k14N9DxrEM7S-eDI4wzpc39I"

async function getServers(){
  const result = await fetch('https://api.access.redhat.com/management/v1/systems', {
    method : 'GET',
    headers :{
      'accept' : 'application/json',
      'Authorization' : 'Bearer ' + tt
    }
  })
  resultJson = await result.json();
  console.log(resultJson.body[1]);

}

getServers()




