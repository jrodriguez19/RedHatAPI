// Adding Express Web Server
const express = require('express');
const app = express();

// Adding Fetch fuction to NodeJS 
const fetch = require('node-fetch');

// Adding Parameters nedded for Red Hat API interaction
const RHAPI = require('./config')


//Listening with express on port 3000 
app.listen(3000, () => console.log("LISTENING AT 3000-----------------------------------------------------------------------------------------------/////////////////"));
app.use(express.static('Front')); app.use(express.json());


//returned value in case of catching an error
const ERRORVALUE = 'ERROR IN THE COMMUNICATION WITH THE RED HAT API';

/**
 * Get temporary Token to perform API calls to Red Hat 
 * @return temporary token
 * */
async function getAccessToken() {
  // Create the body of the HTTP via POST in type x-www-form-urlencoded because it doesn't accept JSON
  var urlencodedBody = new URLSearchParams();
  urlencodedBody.append("grant_type", "refresh_token");
  urlencodedBody.append("client_id", "rhsm-api");
  urlencodedBody.append("refresh_token", RHAPI.offline_token);
  try {
    const response = await fetch(RHAPI.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlencodedBody
    });
    const responseJson = await response.json();
    console.log('TOKEN RECIBIDO DE REDHAT')
    //console.log(response);
    return responseJson.access_token;
  }
  catch (err) {
    console.log('ERROR GETTING THE TOKEN:  ' + err)
    return ERRORVALUE;
  }

}

/**
 * Function to perform the api calls to Red Hat 
 * @return json response from the API call
 * */
async function performAPICall(endPoint, token) {
  try {
    const response = await fetch(endPoint, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
    const reponseJson = await response.json();
    console.log('RESPUESTA!!!!!!! RECIBIDA DE REDHAT')
    console.log(reponseJson)
    return reponseJson;
  }
  catch (err) {
  console.log('ERROR CALLING THE API:  ' + err)
  return ERRORVALUE;
}
}


/**
 * Get list of servers
 */
app.get('/servers_list', async (request, response) => {
  refreshToken = await getAccessToken();
  callResponse = await performAPICall(RHAPI.APICallUrl + '/systems', refreshToken)
  //console.log(callResponse)
  console.log('Rta de RD hat servers available completa')
  response.send(callResponse);
})


/**
 * Get server details
 */
app.get('/server_details', async (request, response) => {
  const systemUUID = request.query['uuid'];
  console.log(systemUUID)
  refreshToken = await getAccessToken();
  callResponse = await performAPICall(RHAPI.APICallUrl + '/systems/' + systemUUID , refreshToken);
  //console.log(callResponse);
  console.log('Rta de RED hat servers available completa');
  response.send(callResponse);
})



/*
app.post('/', async (request, response) => {
  console.log('Recibi una request!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(request.body);
  tkn = await getAccessToken();
  response.json({ 'TUTOKEN': tkn });
})

*/
