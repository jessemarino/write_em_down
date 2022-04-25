const figlet = require("figlet");
const fs = require("fs").promises;
const generateCard = require("../src/generateCard");
const inquirer = require("inquirer");
const List = require("./List");

class CreatCard {
  constructor() {
    // initialize list to null. List will be created after user provides a name.
    this.list = null;
  }

  start() {
    //create a promise to allow chaining .then/.catch
    new Promise((resolve, reject) => {
      figlet("List Genie", function (err, data) {
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
        console.log("Welcome to List Genie");
      })
      .then(() => {
        // return promise to continue chaining
        return inquirer.prompt([
          {
            type: "input",
            message: "Provide a name for your list",
            name: "listName",
          },
        ]);
      })
      .then(({ listName }) => {
        this.list = new List(listName);
        // return to chain any errors to the last .catch below
        this.addItem();
      })
      .catch((err) => this.handleError(err));
  }

  handleError(err) {
    console.log(err);
    console.log("Uh oh. Something went wrong. Scroll up to see details.");
  }

  addItem() {
    return inquirer
      .prompt([
        {
          type: "input",
          message: "Enter an item to add to the list",
          name: "itemName",
        },
        {
          type: "number",
          message: "Enter a quantity for the item",
          name: "quantity",
        },
      ])
      .then(({ itemName, quantity }) => {
        this.list.addItem(itemName, quantity);
        // return to chain .then/.catch
        return inquirer
          .prompt([
            {
              type: "confirm",
              message: "Would you like to add another item?",
              name: "addItem",
            },
          ])
          .then(({ addItem }) => {
            if (addItem) {
              // recursive call to add another item
              return this.addItem();
            }
            // done adding items, time to generate the list html
            return this.writeHtml();
          })
          .catch((err) => this.handleError(err));
      })
      .catch((err) => this.handleError(err));
  }

  writeHtml() {
    const html = generateList(this.list);
    fs.writeFile("dist/team.html", html)
      .then(() => {
        console.log(
          "Created team.html file. You'll find it in the 'dist' folder."
        );
      })
      .catch((err) => this.handleError(err));
  }
}

module.exports = CLI;
