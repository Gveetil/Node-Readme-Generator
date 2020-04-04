# ${(project.title.trim() == "") ? 'Project title ...' : project.title.trim()}

<!-- Badges section -->
${(project.badges.length <= 0)? '' : eval('`' + project.badges.join(" ") + '`')}
<!-- Badges section-->

${(project.description.trim() == "") ? 'Project description goes here ...' : project.description.trim()}

<!-- project homepage section - added only if available -->
${(project.homepage == undefined || project.homepage == '')? '' : `
Homepage: [${project.homepage}](${project.homepage})
`}
<!-- project homepage -->

## Table of Contents

- [Installation](#installation)
- [Usage Instructions](#usage-instructions)
${(project.tests.trim() == "") ? '' : '- [Tests](#tests)'}
${(project.questions.trim() == "") ? '' : '- [FAQ](#faq)'}
${(project.license == "None") ? '' : '- [License](#license)'}

## Installation

${(project.installation.trim() == "") ? 'Project installation instructions go here ...' : project.installation.trim()}

## Usage Instructions

${(project.usage.trim() == "") ? 'Project usage guidelines go here ...' : project.usage.trim()}

<!-- Tests -->
${(project.tests.trim() == "") ? '' : `
## Tests

${project.tests.trim()}
`}
<!-- Tests -->
<!-- FAQ -->
${(project.questions.trim() == "") ? '' : `
## FAQ

${project.questions.trim()}
`}
<!-- FAQ -->
<!-- license section -->
${(project.license == "None")? '' : `
## License

#### ${project.license.name}
${project.license.description}

${project.license.badge}
`}
<!-- license section -->

&nbsp;
<!-- user email -->
Email: ${(user.email == '')? ' Not Available ' : `[${user.email}](mailto:${user.email}?subject=[GitHub]%20${project.repository})`}
<!-- user email -->

<!-- user image -->
![User Image](${(user.imageUrl == '')? '' : user.imageUrl + '&s=200'})
<!-- user image -->



