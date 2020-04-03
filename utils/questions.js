/** object contains an array of questions / prompts to be answered by the user
 *  it is used to recieve user input for generating the readme file */
module.exports = [{
    name: "repository",
    message: "Select Repository:",
    type: "list",
    choices: []
}, {
    name: "title",
    message: "Project title:",
    default: getDefaultTitle
}, {
    name: "description",
    message: "Description:",
    default: getDefaultDescription
}, {
    name: "installation",
    message: "Installation instructions:",
    default: "installation-instructions"
}, {
    name: "usage",
    message: "Usage guidelines:",
    default: "usage-guidelines"
}, {
    name: "tests",
    message: "Testing guidelines:",
    default: "tests"
}, {
    name: "questions",
    message: "Questions:",
    default: "questions"
}, {
    name: "badges",
    message: "Badge type",
    type: "checkbox",
    choices: [{
        name: "GitHub Followers",
        value: "![GitHub followers](https://img.shields.io/github/followers/${user.name}?style=social)"
    }, {
        name: "Maintained - this year",
        value: "![Maintenance](https://img.shields.io/maintenance/yes/${(new Date()).getFullYear()})"
    }, {
        name: "Date updated - now",
        value: "![Relative date](https://img.shields.io/date/${Math.floor(Date.now()/1000)})"
    }, {
        name: "GitHub - last commit",
        value: "![GitHub last commit](https://img.shields.io/github/last-commit/${user.name}/${project.repository})"
    }, {
        name: "GitHub - issues",
        value: "![GitHub issues](https://img.shields.io/github/issues/${user.name}/${project.repository})"
    }, {
        name: "GitHub - repo size",
        value: "![GitHub repo size](https://img.shields.io/github/repo-size/${user.name}/${project.repository})"
    }, {
        name: "GitHub - All Releases",
        value: "![GitHub All Releases](https://img.shields.io/github/downloads/${user.name}/${project.repository}/total)"
    }, {
        name: "Cdnjs - jQuery",
        value: "![Cdnjs](https://img.shields.io/cdnjs/v/jquery)"
    }, {
        name: "Npm - inquirer",
        value: "![npm](https://img.shields.io/npm/v/inquirer)"
    }]
}, {
    name: "license",
    message: "License type",
    type: "list",
    choices: [{
        name: "None",
        value: "None"
    }, {
        name: "Apache 2.0",
        value: {
            name: "Apache",
            description: "Unless otherwise noted all files are covered under Apache License Version 2.0. Please read the LICENSE file for details",
            badge: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
        }
    }, {
        name: "GNU 3.0",
        value: {
            name: "GNU",
            description: "This program is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License (LGPL) as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version. for details see the LICENCE text file.",
            badge: "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
        }
    }, {
        name: "MIT",
        value: {
            name: "MIT",
            description: "This project is licensed under the MIT License - see the LICENSE.md file for details",
            badge: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
        }
    }]
}]

/**
 * Called internally from the inquirer prompt to get the default value of project title
 * @param {Object} data the data entered / selected by the user so far
 * @returns {String} the default project title
 */
function getDefaultTitle(data) {
    if (data != null && "repository" in data && data.repository != null) {
        if (typeof data.repository == "string")
            // return repository name entered by user
            return data.repository.split("-").join(" ");
        else if ("name" in data.repository && typeof data.repository.name == "string") {
            // return repository name selected by user
            return data.repository.name.split("-").join(" ");
        }
    }
    return "title"
}

/**
 * Called internally from the inquirer prompt to get the default value of project description
 * @param {Object} data the data entered / selected by the user so far
 * @returns {String} the default project description
 */
function getDefaultDescription(data) {
    if (data != null && "repository" in data && data.repository != null) {
        if (typeof data.repository == "string")
            // return repository name entered by user
            return data.repository.split("-").join(" ");
        else if ("description" in data.repository && typeof data.repository.description == "string")
            // Get description from repository selected by user
            return data.repository.description;
    }
    return "project-description"
}
