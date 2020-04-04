const inquirer = require("inquirer");
const readme = require("./utils/readme");
const github = require("./utils/github");
const questions = require('./utils/questions');

/** Header message displayed to the user on execution */
const userMessage = "This utility will walk you through creating a README.md file for your project.\n\nPress ^C at any time to quit.\n\n";

/**
 * This method initializes and executes the application  
 */
async function init() {
    try {
        console.log(userMessage);
        // Prompt and load user details 
        gitUserData = await fetchUserData();
        // If no GitHub details were found for this user, display message and exit
        if (gitUserData == null) {
            console.log(">> No GitHub user found for this username!");
            return;
        }
        // load repositories from the GitHub user data into question choices 
        loadQuestionRepositories(gitUserData);
        var response = await inquirer.prompt(questions);
        var projectData = formatUserResponse(response);
        let filename = readme.generate(gitUserData, projectData);
        console.log(`Readme file generated successfully at: ${filename}`);
    }
    catch (error) {
        console.log(`\n\nReadme Generation failed!\nException encountered:\n ${error}`);
    }
}

/**
 * Parses user selection and formats data for display in the readme file
 * @param {Object} data the data entered / selected by the user
 * @returns {Object} the formatted data
 */
function formatUserResponse(data) {
    if (data != null && "repository" in data && data.repository != null) {
        if (typeof data.repository == "string")
            data.repository = data.repository.trim().replace(/ /g, "");
        else {
            // if repository is selected by user - extract name and homepage
            let repoName = data.repository.name;
            let repoHomepage = data.repository.homepage;
            data.repository = repoName;
            data.homepage = repoHomepage;
        }
    }
    return data;
}

/**
 * Load repositories from the GitHub user data into question choices 
 * @param {GitUser} gitUserData the GitHub user data
 */
function loadQuestionRepositories(gitUserData) {
    const repoOptionList = [];
    // Build list of repository choices
    for (const repo of gitUserData.repositories) {
        let repoOption = {
            name: repo.name,
            value: {
                name: repo.name,
                description: repo.description,
                homepage: repo.homepage
            }
        };
        repoOptionList.push(repoOption);
    }
    // Attach repository list choices to the repository question
    for (let question of questions) {
        if (question.name == "repository") {
            // If repository choices exist - add them, otherwise switch to accept user text input 
            if (repoOptionList.length > 0) {
                question.choices = repoOptionList;
            }
            else {
                question.type = "input";
                question.validate = validateName;
                delete question.choices;
            }
            break;
        }
    }
}

/**
 * Prompts the user to enter a username and validates and loads the GitHub user data for 
 * the username entered.
 * @returns {GitUser} returns object containing user GitHub details if successful; null if no user found / error
 */
async function fetchUserData() {
    try {
        const usernamePrompt = {
            name: "gitUsername",
            message: "GitHub username:",
            validate: validateName
        }
        // Prompt user for username input
        let data = await inquirer.prompt(usernamePrompt);
        let username = data.gitUsername.trim();
        if (username == "")
            return null;
        // load and return GitHub details of the user 
        return await github.getUser(username);
    }
    catch{
        // Error loading user 
        return null;
    }
}

/**
 * Called internally from the inquirer prompt to check if the user name / repository name entered is valid 
 * @param {String} name the name entered by the user at the prompt
 * @returns {Object} returns true if successful; String with error message if validation fails
 */
function validateName(name) {
    if (name.trim() == "") {
        return " Please enter a vaild name ";
    }
    return true;
}

// Call the init method to start the application
init();
