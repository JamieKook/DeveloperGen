const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

function generateHTML(data,imageUrl,location, html_url, blog, name, bio, public_repos, followers, stars, following) {
  return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <title>Document</title>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }

         html, body {
         padding: 0;
         margin: 0;
         }
         html, body{
         height: 100%;
         }
         .wrapper {
         background-color: ${colors[data.color].wrapperBackground};
         padding-top: 100px;
         height: 25%; 
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         height: 50%; 
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         top: -15%; 
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${colors[data.color].headerBackground};
         color: ${colors[data.color].headerColor};
         padding: 10px;
         width: 85%;
         height: 500px; 
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[data.color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
          position: relative;
          top:  -10%; 
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         .bottom{
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
         }

         @media print { 
          body { 
            zoom: .77; 
          } 
         }
      </style>
      </head>
      <body>
        <div class="wrapper">
        </div>
        <div class="photo-header">
            <img src="${imageUrl}">
            <h1>Hi!</h1>
            <h2>My name is ${name}!</h2>
            <div class="nav-link">
              <a class="links-nav m-2" target="_blank" href="locationURL">${location}</a>
              <a class="links-nav m-2" target="_blank" href="${html_url}">GitHub</a>
              <a class="links-nav m-2" target="_blank" href="https://${blog}">Blog</a>
            </div>
          </div>
        <div class= "main container text-center">
        <h2>${bio}</h2>
        <div class= "row d-flex justify-content-around">
          <div class="col-md-5 mx-0 my-1 card">
            <h2>Public Repositories</h2>
            <h3>${public_repos}</h3>
          </div>
          <div class="col-md-5 mx-0 my-1 card">
            <h2>Followers</h2>
            <h3>${followers}</h3>
          </div>
        </div>
        <div class= "row d-flex justify-content-around">
            <div class="col-md-5 mx-0 my-1 card">
            <h2>GitHub Stars</h2>
            <h3>${stars}</h3>
          </div>
          <div class="col-md-5 mx-0 my-1 card">
            <h2>Following</h2>
            <h3>${following}</h3>
          </div>
          </div>
      </div>
      <div class="wrapper bottom"></div>
  
      </body>`
        }

module.exports= {
  colors: colors,
  generateHTML: generateHTML
}