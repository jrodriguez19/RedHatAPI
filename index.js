const express = require('express');
const fetch = require ('node-fetch');

const RHAPI = require('./config')


const server = express();

server.listen(3000, ()=> console.log("LISTENING AT 3000"));

server.use(express.static('Front'));




console.log('Ejecutando Fetch')

// Create the body of the HTTP via POST in type x-www-form-urlencoded because it doesn't accept JSON
var urlencodedBody = new URLSearchParams();
urlencodedBody.append("grant_type", "refresh_token");
urlencodedBody.append("client_id", "rhsm-api");
urlencodedBody.append("refresh_token", RHAPI.offline_token);


async function getRefreshToken(){
  try{
    response = await fetch(RHAPI.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: urlencodedBody
  });
  rtaJson = await response.json();
  return rtaJson.access_token;

  }
  catch(err){
    console.log('Error in the call to the API: ' + err)
  }
  
}


getRefreshToken()
.then(token => {
  console.log('Temporary Token:' + token);
  return token;
})













/*
var myHeaders = new fetch.Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Cookie", "BIGipServer~prod~keycloak-webssl-https=437390090.64288.0000; sso_origin_dc=origin-sso-rdu2.redhat.com");

var urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "refresh_token");
urlencoded.append("client_id", "rhsm-api");
urlencoded.append("refresh_token", "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItNGVsY19WZE5fV3NPVVlmMkc0UXhyOEdjd0l4X0t0WFVDaXRhdExLbEx3In0.eyJqdGkiOiJhOGE5ZWRkMi1iYWQzLTQzMjgtYmYxMS00M2YyNmI5YTA2YzQiLCJleHAiOjAsIm5iZiI6MCwiaWF0IjoxNjAwMDYzODYxLCJpc3MiOiJodHRwczovL3Nzby5yZWRoYXQuY29tL2F1dGgvcmVhbG1zL3JlZGhhdC1leHRlcm5hbCIsImF1ZCI6InJoc20tYXBpIiwic3ViIjoiZjo1MjhkNzZmZi1mNzA4LTQzZWQtOGNkNS1mZTE2ZjRmZTBjZTY6anJvZHJpZ3Vlem5Ac2ljZS5jb20uYXUiLCJ0eXAiOiJPZmZsaW5lIiwiYXpwIjoicmhzbS1hcGkiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiIxZjhmZTBkMi04YWYwLTQ1NzMtYWQ5NS04ODVmNTVmOGIyOWIiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicG9ydGFsX21hbmFnZV9zdWJzY3JpcHRpb25zIiwib2ZmbGluZV9hY2Nlc3MiLCJwb3J0YWxfbWFuYWdlX2Nhc2VzIiwiY2FuZGxlcGluX3N5c3RlbV9hY2Nlc3Nfdmlld19hbGwiLCJwb3J0YWxfc3lzdGVtX21hbmFnZW1lbnQiLCJwb3J0YWxfZG93bmxvYWQiXX0sInJlc291cmNlX2FjY2VzcyI6e319.mT6H9gSTpUGEhiHG117PPlR2-fq5CfiILzAjwqUerhUviRpxz87RdLJmlb9YFZM0upvg61Sph7px0k2li1XfYdPlIj2SCk0sjkPOovFbQEXfHhk0tDmfjcUz-1xf7I3i0bQRBGi9flO68yHWrrZ5IAF81gqTHizJ6WZlBtsOK7wIRfEv_NUabieb37mM-81j0EJR04x8adUZqgKhM30-rw_nL_Do9xyKJB8B0AOIxADqVvCm44snX0z1utPYw5xZdVHYeFz05f6092itGuvUuUdnOe1Rbod_b_lqzTXdPYbCaUQJBlN8_-JCQXd4sHAsiGQeCXRWUeX7ZtdOLm6LZ22eFaYGdCeUhVOMx7UhsxlKnK2DrcOLg4fTRv4Hy_6U6klBqoTGCW7wjgT8oj0mvRNj56XGSk95grPY4nWa9wAOEFJqTINIkz1AoN8yffU6UZ4ItMZBU4Xzsnb6oY9N6P0z_7YHo3wwp4Qe35nbB8tzuPnuzjWZYSAugiTaP0xdVHDKvYyHeDIK3aeT1y3MUu3bp7oAra5R--O-3PufiiGjXc4I5YwsMoPhihpTYzm0uhAdhmlvllaRWUWUi9rUq-9D-dcdXSoA3QMKQUOM1mS2YiB9L8L4ZsHOmpdedjPMt9HBpdu1BpiemAl6XLKV-S2uhqlFc5R0LgS6-FM3WSk");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

const token = fetch("https://sso.redhat.com/auth/realms/redhat-external/protocol/openid-connect/token", requestOptions)
  .then(response => response.text())
  .then(result => JSON.parse(result))
  .then(resultJSON => resultJSON.access_token)
  .catch(error => console.log('error', error));

 console.log(token)
*/

