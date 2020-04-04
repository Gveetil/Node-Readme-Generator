/** object contains an array of questions / prompts to be answered by the user
 *  it is used to recieve user input for generating the readme file */
module.exports = [{
    name: "repository",
    message: "Project Repository:",
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
        name: "GitHub - issues",
        value: "![GitHub issues](https://img.shields.io/github/issues/${user.name}/${project.repository})"
    }, {
        name: "GitHub - repo size",
        value: "![GitHub repo size](https://img.shields.io/github/repo-size/${user.name}/${project.repository})"
    }, {
        name: "GitHub Downloads - All Releases",
        value: "![GitHub All Releases](https://img.shields.io/github/downloads/${user.name}/${project.repository}/total)"
    }, {
        name: "GitHub - last commit",
        value: "![GitHub last commit](https://img.shields.io/github/last-commit/${user.name}/${project.repository})"
    }, {
        name: "Cdnjs - jQuery",
        value: "![Cdnjs](https://img.shields.io/cdnjs/v/jquery)"
    }, {
        name: "Npm - inquirer",
        value: "![npm](https://img.shields.io/npm/v/inquirer)"
    }, {
        name: `Maintained - ${(new Date()).getFullYear()}`,
        value: "![Maintenance](https://img.shields.io/maintenance/yes/${(new Date()).getFullYear()})"
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
            description: `Copyright ${(new Date()).getFullYear()} \n\nLicensed under the Apache License, Version 2.0; you may not use this software except in compliance with the License. \n\nUnless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Please refer to the License file for specific permissions and limitations of the License.
            `,
            badge: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
        }
    }, {
        name: "GNU 3.0",
        value: {
            name: "GNU",
            description: `Copyright ${(new Date()).getFullYear()} \n\nThis program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.\n\nFor more details please refer to the LICENCE text file.`,
            badge: "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
        }
    }, {
        name: "ISC",
        value: {
            name: "ISC",
            description: `Copyright ${(new Date()).getFullYear()} \n\nPermission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.\n\nTHE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`,
            badge: "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
        }
    }, {
        name: "MIT",
        value: {
            name: "MIT",
            description: `Copyright ${(new Date()).getFullYear()} \n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`,
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
