var mysql = require("mysql");
var inquirer = require("inquirer");
//not installed yet. don't know how ot use yet
// var cTable = require("console.table");

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
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    printAvailable();
                    break;
                case "View Low Inventory":
                    printLow();
                    break;
                case "Add to Inventory":
                    // If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
                    console.log("you chose option 3");
                    addInventory();
                    break;
                case "Add New Product":
                    // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
                    console.log("you chose option 4");
                    addProduct();
                    start();
                    break;
            }

        });
}

function printAvailable() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock > 0) {
                console.log("id: " + res[i].id + " item: " + res[i].item + " department: " + res[i].department + " price: " + res[i].price + " stock: " + res[i].stock);
            }
        }
        start();
    });
}

function printLow() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock < 5) {
                console.log("id: " + res[i].id + " item: " + res[i].item + " department: " + res[i].department + " price: " + res[i].price + " stock: " + res[i].stock);
            }
        }
        start(res);
    });
}

function addInventory(res) {
    
}

function addProduct() {
    
}