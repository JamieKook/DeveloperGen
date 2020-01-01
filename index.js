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
let queryUrl= null; 
let data=null; 
let username= null; 
let lat= null; 
let lng= null; 

inquirer
//gather userinput of github name and color scheme
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
  ])
  //Call to Github using username
  .then(function(response){
    username= response.username;
    data= response; 
    queryUrl = `https://api.github.com/users/${username}`;
    return axios.get(queryUrl);
  })
  //setting global variables to information gathered from github
  //also makes an api call to google geocoding to get lat and lng 
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
    const geolocateurl= `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleAPI}`;
    return axios.get(geolocateurl);
  })
  //storing response as lat and lng
  //makes api call to github to get number of starred repositories
  .then(function(response){
    lat= response.data.results[0].geometry.location.lat;
    lng= response.data.results[0].geometry.location.lng;
    return axios.get(queryUrl+"/starred");
  })
  //Saves stars, gets google maps url, generates html, and converts to pdf
  .then(function(res){
    stars=res.data.length;
    const locationUrl= `https://www.google.com/maps/@?api=1&map_action=map&center=${lat},${lng}&zoom=14`;
    const htmlData= generateHTML.generateHTML(data,imageUrl,location, locationUrl, html_url, blog, name, bio, public_repos, followers, stars, following);
    conversion({html: htmlData, delay: 1000}, function(err, result){
      if (err){
        return console.log(err); 
      } 
      console.log(result.numberOfPages); 
      console.log("success"); 
      // console.log(result.logs); 
      result.stream.pipe(fs.createWriteStream(username+".pdf"));
      conversion.kill(); 
    });     
  });


  
