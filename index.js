const inquirer = require("inquirer");
const generateHTML = require("./generateHTML.js"); 
const axios= require("axios"); 
const fs= require("fs"),
  convertFactory= require("electron-html-to"); 
const conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
}); 

// //enter your googleAPI account here:
const googleAPI=;  

//global variables
let imageUrl= null; 
let location= null; 
let html_url = null; 
let blog= null; 
let bio= null; 
let public_repos= null; 
let followers = null; 
let stars = null;
let following=null; 
let name= null;  

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username"
    },
    {
      type: "list",
      message: "What is your favorite color?",
      choices: ["green", "red", "blue", "pink"], 
      name: "color"
    }
  ]).then(function(response){
    const {username}= response;
    const data= response; 
    const queryUrl = `https://api.github.com/users/${username}`;
    axios
      .get(queryUrl)
      .then(function(res){
         imageUrl= res.data.avatar_url; 
         location= res.data.location; 
         html_url = res.data.html_url; 
         blog= res.data.blog.toLowerCase(); 
         bio= res.data.bio; 
         public_repos= res.data.public_repos; 
         followers = res.data.followers; 
         following= res.data.following;
         name= res.data.name; 
         console.log(location);
         const geolocateurl= `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleAPI}`;
         console.log(geolocateurl); 

         axios
          .get(geolocateurl)
          .then(function(response){
            console.log(response.data.results[0].geometry); 
            const lat= response.data.results[0].geometry.location.lat;
            const lng= response.data.results[0].geometry.location.lng;
            console.log(lat, lng); 

            axios
            .get(queryUrl+"/starred")
            .then(function(res){
              stars=res.data.length;
              const locationUrl= `https://www.google.com/maps/@?api=1&map_action=map&center=${lat},${lng}&zoom=14`;
              const htmlData= generateHTML.generateHTML(data,imageUrl,location, locationUrl, html_url, blog, name, bio, public_repos, followers, stars, following);
              conversion({html: htmlData, delay: 1000}, function(err, result){
                  if (err){
                    return console.log(err); 
                  } 
                  console.log(result.numberOfPages); 
                  // console.log(result.logs); 
                  result.stream.pipe(fs.createWriteStream(username+".pdf"));
                  conversion.kill(); 
                  });
                fs.writeFile(username+".html", htmlData, function(err){
                  if (err){
                    console.log(err);
                  } else{
                    console.log("success"); 
                    const htmlFile= fs.readFileSync(username+".html", "utf8");
                  }
                });       
            }); 
          });
      });
  }) 

  
