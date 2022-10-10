// TODO: Include packages needed for this application
const md = require('./utils/generateMarkdown');
const fs = require("fs");
const inquirer = require("inquirer");

// Project object to store meta data and mdObj
const project = {
    meta: [],
    mdObj: [],
};

// Array of questions for project meta data
const questions = [
    {
        type: "input",
        name: "title",
        message: "Enter the name of the project:",
    },
    {
        type: "input",
        name: "user",
        message: "Enter your GitHub user name:",
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email address:",
    },
    {
        type: "checkbox",
        name: "sections",
        message: "Which sections should be included?",
        choices: [
            "description",
            "installation",
            "usage",
            "license",
            "contributing",
            "tests",
            "questions"]
    },
];

// Prompt user for sections
const getSections = async () => {
    const sections = await inquirer.prompt(questions);
    return sections;
}

// Prompt user for section info
const getInfo = async (section) => {
    let infoInput;

    if (section === "license") {
        infoInput = await inquirer.prompt([
            {
                type: "list",
                name: "license",
                message: `Choose the license type?`,
                choices: [
                    "MIT License",
                    "Apache License 2.0",
                    "BSD 2-Clause 'Simplified' License",
                    "BSD-3-Clause 'New' or 'Revised' License",
                    "Boost Software License 1.0",
                    "Creative Commons Zero v1.0 Universal",
                    "Eclipse Public License 2.0",
                    "GNU Alfero Genearl Public Licnse v3.0",
                    "GNU Genearl Public License v2.0",
                    "GNU Lesser General Public License v2.1",
                    "Mozilla Public License 2.0",
                    "The Unlicense"
                ],
            }
        ]);
    } else {
        infoInput = await inquirer.prompt([
            {
                type: "input",
                name: "info",
                message: `Enter info for section '${section}'`,
            }
        ]);
    }
    return infoInput;
}

// Write README file
function writeToFile(fileName, data) {
    if (project.meta.sections && project.meta.sections.length > 0) {
        // Remove old README file
        if (fs.existsSync("./README.md")) {
            fs.unlinkSync("./README.md");
        }

        // Append text to README
        fs.appendFile(fileName, data, (err) => {
            err ? console.log(err) : console.log("README file created!")
        });
    }
}

// Initialize app function
async function init() {
    // Get meta data for project
    const projectInfo = await getSections();
    project.meta = projectInfo;

    // Get info for each section
    for (const section of projectInfo.sections) {
        let info = await getInfo(section);
        if (section === "license") {
            project.meta.license = info.license
        }
        info = { header: section, info: Object.values(info) }
        project.mdObj.push(info)
    }

    // Generate markdown string
    let markDownString = md.generateMarkdown(project);

    // Append md string to README file
    writeToFile("README.md", markDownString)
}

// Function call to initialize app
init();
