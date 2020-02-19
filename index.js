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