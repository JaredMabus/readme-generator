// TODO: Include packages needed for this application
const md = require('./utils/generateMarkdown');
const fs = require("fs");
const inquirer = require("inquirer");

const markDownObj = [];

/*
 [
    title: {
        header: # <name-of-project>
    },
    description: {
        header: ## Description,
        info: ["This is the des"]
    },
 ] 
 */


// TODO: Create an array of questions for user input
const questions = [
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
    // console.log(sections);
    return sections;
}

// Prompt user for section info
const getInfo = async (section) => {
    let infoInput;

    if(section === "license") {
        infoInput = await inquirer.prompt([
            {
                type: "list",
                name: section,
                message: `Enter info for ${section}`,
                choice: [
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
                message: `Enter info for ${section}`,
            }
        ]);
    }
    return infoInput;
}


// TODO: Create a function to write README file
function writeToFile(fileName, data) { 
    if(markDownObj && markDownObj.length > 0){
        // Set file name to lowercase and remove spaces
        // let fileName = fileName.toLowercase().split(' ').join('');

        // Generate Markdown
        data = md.generateMarkdown(data)
        // Append data to markdown
        fs.appendFile(fileName, data, (err) => {
            err ? console.log(err) : ""
        });
    }
}

// TODO: Create a function to initialize app
async function init() {
    const sections = await getSections();

    for (const section of sections.sections) {
        let info = await getInfo(section);
        info = {title: section, info: Object.values(info)}
        markDownObj.push(info)
    }
    writeToFile("README.md", markDownObj)
}

// Function call to initialize app
init();
