//npm
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

//write the file
const writeFileAsync = util.promisify(fs.writeFile);

// ask the question
function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "username",
            message: "What is your GitHub Username?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your GitHub email address?"
        }
    ]);
}

var userAnswers = {};

promptUser()
    .then(function(response) {
        userAnswers = response;
        console.log(response);

        const queryUrl = `https://api.github.com/users/${response.username}`;
        return axios.get(queryUrl);
    }).then(function(response) {
        const readMe = generate(userAnswers, response);
        return writeFileAsync("UmeshReadME.md", readMe);
    }).then(function() {
        console.log("Success!");
    })

function generate(data, response) {
    return `# ${response.data.name}
    # ${response.data.avatar_url}
    # ${response.data.bio}
    # ${data.email}`;
}






/*//Global 
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

//asks the questions
function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "userName",
            message: "What is your GitHub Username?"
        },
        {
            type: "input",
            name: "title",
            message: "What is your Project's title?"
        },
        {
            type: "input",
            name: "description",
            message: "What is the description of your project?"
        },
        {
            type: "input",
            name: "tableOfContents",
            message: "What are the Table of Contents?"
        },
        {
            type: "input",
            name: "installation",
            message: "What is your preferred Installation?"
        },
        {
            type: "input",
            name: "usage",
            message: "What will be the usage for your project?"
        },
        {
            type: "input",
            name: "license",
            message: "What is the license for your project?"
        },
        {
            type: "input",
            name: "contributing",
            message: "Who were the contributing members on your project?"
        },
        {
            type: "input",
            name: "tests",
            message: "What are the tests in your project?"
        },
    ]);
}

//Starts the program
initial()

//This function runs two different api call for getting Users GitHub info and stores it in a new object
const getUserProfile = (answers) => {

    const avatarUrl = `https://api.github.com/users/${answers.userName}`;
    return axios
        .get(avatarUrl)
        .then((response) => {
            const userAvatar = response.data.avatar_url;
            let emailUrl = response.data.events_url;
            if (emailUrl.indexOf("{/privacy}") > -1) {
                emailUrl = emailUrl.substring(0, emailUrl.indexOf("{/privacy}"));
            }
            return axios
                .get(emailUrl)
                .then((response) => {
                    userEmail = response.data[0].payload.commits[0].author.email;
                    return {
                        email: userEmail,
                        avatar: userAvatar
                    };
                });
        })
}

async function initial() {
    try {
        //This fucntion call stores the users answers in a new object
        let answers = await promptUser();
        //This function call runs two different api call for getting Users GitHub info and stores it in a new object
        let profile = await getUserProfile(answers);
        //This function call stores the Generated ReadME.md as a string literal object from 
        let generatedMD = await generate(answers, profile);
        //This uses the File Systems functions to create a UserReadME.md file 
        await writeFileAsync("UserREADME.md", generatedMD);
        console.log("Success!!");
        //console logs a generic error message if any error occurs
    } catch (error) {
        console.log(error);
    }
}

//This function creates the template for a generated ReadMe.md with the appropiate info
const generate = (answers, profile) => {
    return `
## Title: 
${answers.title}
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
## Contact:
${answers.userName}  
E-mail: ${profile.email}  
![alt text](${profile.avatar})
## Description:
${answers.description}
## Table of Contents:
${answers.tableOfContents}
## Installation:
${answers.install}
## Usage:
${answers.usage}
## Licenses:
${answers.license}
## Contributing Members:
${answers.contributing}
## Tests:
${answers.tests}
`;
};*/