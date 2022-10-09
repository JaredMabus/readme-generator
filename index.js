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
    const infoInput = await inquirer.prompt([
        {
            type: "input",
            name: section,
            message: `Enter info for ${section}`,
        }
    ]
    );
    return infoInput;
}


// TODO: Create a function to write README file
function writeToFile(fileName, data) { }

// TODO: Create a function to initialize app
async function init() {
    const sections = await getSections();

    for (const section of sections.sections) {
        let info = await getInfo(section);
        markDownObj.push(info)
    }

    console.log(markDownObj)
}

// Function call to initialize app
init();
