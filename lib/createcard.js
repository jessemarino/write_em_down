const figlet = require("figlet");
const fs = require("fs").promises;
const inquirer = require("inquirer");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Employee = require("./Employee");
const Intern = require("./Intern");
const generateCard = require("../src/generateCard")

class CreateCard {
  constructor() {
    this.generateCard = null;
  }

  start() {
    //create a promise to allow chaining .then/.catch
    new Promise((resolve, reject) => {
      figlet("Write em Down", function (err, data) {
        if (err) {
          reject(err);
          return;
        }
        console.log(data);
        resolve();
      });
    })
      .catch(() => {
        // something is wrong with figlet.
        // provide fallback welcome message
        console.log("Welcome to Write em Down");
      })
      .then(() => {
        // return promise to continue chaining
        return inquirer.prompt([
          {
            type: "list",
            message: "Who would you like to add?",
            name: "role",
            choices : [Manager, Engineer, Employee, Intern]
          },
        ]);
      })
      .then(({ role }) => {
        this.list = new Employee(role);
        // return to chain any errors to the last .catch below
        this.addEmployeeInfo();
      })
      .catch((err) => this.handleError(err));
  }

  handleError(err) {
    console.log(err);
    console.log("Uh oh. Something went wrong. Scroll up to see details.");
  }

  addEmployeeInfo() {
    return inquirer
      .prompt([
        {
          type: "input",
          message: "What is their name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is their ID number?",
          name: "id",
        },
        {
          type: "input",
          message: "What is their email adress?",
          name: "email"
        },
      ])
      .then(({ name, id, email}) => {
        this.list(name, id, email);
        // return to chain .then/.catch
        return inquirer
          .prompt([
            {
              type: "confirm",
              message: "Would you like to add another person?",
              name: "addItem",
            },
          ])
          .then(({ addInfo }) => {
            if (addInfo) {
              // recursive call to add another item
              return this.addEmployeeInfo();
            }
            // done adding items, time to generate the list html
            return this.writeHtml();
          })
          .catch((err) => this.handleError(err));
      })
      .catch((err) => this.handleError(err));
  }

  writeHtml() {
    const html = generateList(Employee);
    fs.writeFile("dist/team.html", html)
      .then(() => {
        console.log(
          "Created team.html file. You'll find it in the 'dist' folder."
        );
      })
      .catch((err) => this.handleError(err));
  }
}

module.exports = CreateCard;
