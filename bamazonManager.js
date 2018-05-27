var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
      })
      .then(function(answer) {
        switch(answer.action){
            case "View Products for Sale":
            // If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
            console.log("you chose option 1");
            start();
                break;
            case "View Low Inventory":
            // If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
            console.log("you chose option 2");
            start();
                break;
            case "Add to Inventory":
            // If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
            console.log("you chose option 3");
            start();
                break;
            case "Add New Product": 
            // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
            console.log("you chose option 4");
            start();
                break;
        }

      });
  }