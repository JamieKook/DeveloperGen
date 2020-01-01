# Developer Profile Generator

This node-based application returns a pdf resume displyaing information gathered from an inputed Github username. 

![image of generated resume pdf](Resume.png)

## Installation

Clone folder onto your own computer by forking the repository and using the "Clone or download" button on github. Make sure that a working Google maps API key is entered in the index.js for the variable:

const googleAPI=;    

Run the program by calling node index.js from the commandline open in the root folder.

## Functionality 

### User Input
Users will be asked for the Github username and the color theme for the generated resume in the command line. 

### Github Infomation
This application makes an api call to Github to gather the following information from the given username: 
Profile image, location, link to Github profile, link to blog, the user's bio, number of public repositories, number of followers, number of Github stars, and number of user's he/she is following. 

### Google Maps Location
The pdf also includes a link to a Google map of the user's location. 

## Coding

*   This project utilizes javascript and css.
*   Bootstraps 4 and Fontawesome are utilized for the styling.
*   Inquier is used to gather user input from the command line. 
*   Axios is used to make API calls.
*   Github's api is called to gather input from a given username. 
*   Google's geocoding api deteremines the lattitude and longitude from the given       city which is then create Google's map url to link to the location. 
*   File System and Electron-html-to are used to create the pdf from the generated      html. 

## Meta 

Jamie Kook - kookjc6@gmail.com


