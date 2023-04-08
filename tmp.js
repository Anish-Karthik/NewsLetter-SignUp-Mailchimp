// const express = require('express');
// const bodyParser = require('body-parser');
// const request = require('request');
// const https = require('https');

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/signup.html');
// });

// app.post('/welcome', (req, res) => {

//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     console.log(firstName, lastName, email);
//     // these are the data that we will send to mailchimp
//     const data = {
//         members: [
//             {
//                 email_address: email,
//                 status: 'subscribed',
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//             }
//         ]
//     };
//     var jsonData = JSON.stringify(data);
//     const url = 'https://us21.api.mailchimp.com/3.0/lists/ad988d90c3';
//     const options = {
//         method: 'POST',
//         auth: "mohamed: f39e0300e57ff2fe1d315f4e5411bfc5-us21" // any string: api key
//     };
//     const request = https.request(url, options, (response) => {
//         response.on('data', (data) => {
//             console.log(JSON.parse(data));
//         });
//     });
//     request.write(jsonData);
//     request.end();
// });

// app.listen(3000, () => {
//     console.log('Example app listening on port 3000!');
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const request = require('request');
// const https = require('https');

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/signup.html');
// });

// app.post('/welcome', (req, res) => {

//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     console.log(firstName, lastName, email);
//     // these are the data that we will send to mailchimp
//     const data = {
//         members: [
//             {
//                 email_address: email,
//                 status: 'subscribed',
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//             }
//         ]
//     };
//     // first we need to convert the data to JSON format from normal JS object
//     var jsonData = JSON.stringify(data);
//     // now we need to send the data to mailchimp to this url and makesure you use the 
//     // us'x' number that you can find it in the mailchimp api documentation
//     const url = 'https://us21.api.mailchimp.com/3.0/lists/ad988d90c3';
    
//     // required options 
//     const options = {
//         method: 'POST',
//         auth: "mohamed: f39e0300e57ff2fe1d315f4e5411bfc5-us21" // any string: api key
//     };

//     // what is the use of request() ?
//     // request() is used to send the data to the server
//     const request = https.request(url, options, (response) => {
//         //  whats is the use of response.on() ?
//         // response.on() is used to listen to the response from the server
//         response.on('data', (data) => {
//             console.log(JSON.parse(data));
//         });
//     });

//     // what is the use of request.write() ?
//     // request.write() is used to write the data to the server
//     request.write(jsonData);
//     // what is the use of request.end() ?
//     // request.end() is used to end the request
//     request.end();

//     // res.write('<h1>Welcome ' + firstName + ' ' + lastName + ' to our website!</h1><br>');
//     // res.write('</h1>We will send you an email at ' + email + '</h1>');
//     // res.send();
//     // res.sendFile(__dirname + '/success.html');
// });

// app.listen(3000, () => {
//     console.log('Example app listening on port 3000!');
// });



const express = require("express")
const mailchimp = require("@mailchimp/mailchimp_marketing")
const app = express()
const https = require("https")


app.use(express.static(__dirname))
app.use(express.urlencoded({extended: true}))

//Setting up MailChimp

mailchimp.setConfig({
//API KEY
 apiKey: "f39e0300e57ff2fe1d315f4e5411bfc5-us21",
//API KEY PREFIX (THE SERVER)
  server: "us21"
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html")
});
  

app.post("/", function (req, res) {
  const firstName = req.body.fName
  const lastName = req.body.lName
  const email = req.body.email

  console.log(firstName, lastName, email);

  const data = {
    members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName}
      }]
  }

  const jsonData = JSON.stringify(data)
  
  const url = "https://usxx.api.mailchimp.com/3.0/lists/ad988d90c3"
  
  const options = {
    method: "POST",
    auth:'anyStringYouWant:f39e0300e57ff2fe1d315f4e5411bfc5-us21' 
    //Enter the API key
  }
  
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function (data){
      console.log(JSON.parse(data))
        })
      })

      //comment the request to test the de failure page
      request.write(jsonData)
      request.end()

    })

app.post("/failure", function (req, res) {
  res.redirect("/")
})

app.listen(3000, () => console.log("Server is running on port 3000"))