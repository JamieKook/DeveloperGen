const inquirer = require("inquirer");
const generateHTML = require("./generateHTML.js"); 
const axios= require("axios"); 

const fs= require("fs"),
  convertFactory= require("electron-html-to"); 

 
const conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
}); 

// const pdf= require("html-pdf"); 

// //enter your googleAPI account here:
// const googleAPI="";  

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
         console.log(blog); 
          
         axios
          .get(queryUrl+"/starred")
          .then(function(res){
            stars=res.data.length;
            // const locationUrl= `https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=14&size=400x400&key=${googleAPI}`; 
            const htmlData= generateHTML.generateHTML(data,imageUrl,location, html_url, blog, name, bio, public_repos, followers, stars, following);
            conversion({html: htmlData}, function(err, result){
                if (err){
                  return console.log(err); 
                } 
                console.log(result.numberOfPages); 
                console.log(result.logs); 
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
  }) 

  
