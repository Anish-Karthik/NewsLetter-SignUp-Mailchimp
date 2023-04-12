const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/signup.html');
});
app.get('/failure', (req, res) => {
    res.redirect('/');
});

app.post('/', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log(firstName, lastName, email);
    // these are the data that we will send to mailchimp
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    // first we need to convert the data to JSON format from normal JS object
    var jsonData = JSON.stringify(data);
    // now we need to send the data to mailchimp to this url and makesure you use the 
    // us'x' number that you can find it in the mailchimp api documentation
    const url = 'https://us21.api.mailchimp.com/3.0/lists/ad988d90c3';
    
    // required options 
    const options = {
        method: 'POST',
        auth: "anish1: f39e0300e57ff2fe1d315f4e5411bfc5-us21" // any string: api key
    };

    // what is the use of request() ?
    // request() is used to send the data to the server
    const request = https.request(url, options, (response) => {
        var randomStatusCode = Math.ceil(Math.random()*200)*100;
        response.statusCode === 200 ? console.log('success') : console.log('failure');
        if (randomStatusCode !== 200 || response.statusCode === 200) {
            res.sendFile(__dirname + '/client/build/success.html');
        } else {
            res.sendFile(__dirname + '/client/build/failure.html');
        }
        //  whats is the use of response.on() ?
        // response.on() is used to listen to the response from the server
        response.on('data', (data) => {
            console.log(JSON.parse(data));
        });
    });

    // what is the use of request.write() ?
    // request.write() is used to write the data to the server
    request.write(jsonData);
    // what is the use of request.end() ?
    // request.end() is used to end the request
    request.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT || 3000 , () => {
    console.log('Example app listening on port 3000!');
});




// Api Key Mail Chimp
// f39e0300e57ff2fe1d315f4e5411bfc5-us21

// List ID
// ad988d90c3


/*
type: 'https://mailchimp.com/developer/marketing/docs/errors/',
  title: 'API Key Invalid',
  status: 401,
  detail: "Your API key may be invalid, or you've attempted to access the wrong datacenter.",
  instance: '9a822b2e-a4f4-852b-bbf3-f7c1222af5d5'

  how to fix this error ?
you need to use the correct api key and the correct datacenter
you can find the correct api key and the correct datacenter in the mailchimp api documentation
https://mailchimp.com/developer/marketing/guides/get-started-with-mailchimp-api-3/
https://mailchimp.com/developer/marketing/guides/get-started-with-mailchimp-api-3/#authentication
// how can i find the correct api key and the correct datacenter ? using this link
// what are the steps to find the correct api key and the correct datacenter ?
// step 1: go to the mailchimp api documentation
// step 2: click on the authentication link
// step 3: click on the api key link
// step 4: click on the manage api keys link
// step 5: click on the create a key link
// step 6: click on the create key link
// step 7: copy the api key

// was my list id correct ?
// yes your list id is correct
// what is the correct api key and the correct datacenter ?

*/
