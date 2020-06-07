const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      { email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us10.api.mailchimp.com/3.0/lists/b636386a7d",
    method: "POST",
    headers: {
      "Authorization": "deeps fe36711c9f0b81e18fe2ca89d722c8eb-us10"
    },
    body: jsonData
  };

  request(options, function(error, responce, body){
    if (error){
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (responce.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started at port 3000");
});

//api key: fe36711c9f0b81e18fe2ca89d722c8eb-us10
//list id: b636386a7d
