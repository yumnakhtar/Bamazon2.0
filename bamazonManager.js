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

function start(res) {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
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
                    addInventory(res);
                    break;
                case "Add New Product":
                    addProduct(res);
                    break;
                case "Exit":
                    connection.end();
            }

        });
}

function printAvailable() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log(res);
        start(res);
    });
}

function printLow() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock < 10) {
                console.log("id: " + res[i].id + " item: " + res[i].item + " department: " + res[i].department + " price: " + res[i].price + " stock: " + res[i].stock);
            }
        }
        start(res);
    });
}

function addInventory(res) {
    inquirer
        .prompt([
            {
                name: "item_ID",
                type: "input",
                message: "What is the item number of the product you'd like to add? ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\n Invalid input, please try again");
                    return false;
                }
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to add to inventory? ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\n Invalid input, please try again");
                    return false;
                }
            }
        ]).then(function (answer) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock:
                                (res[answer.item_ID - 1].stock + parseInt(answer.amount))
                        },
                        {
                            id: answer.item_ID
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        else {
                            console.log("Inventory has been adjusted");
                            start();
                        }
                    }
                )
        })
}

function addProduct(res) {
    inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department does this item fall into?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of this item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "stock",
        type: "input",
        message: "How many of this item would you like to add to inventory",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
        var itemCap = answer.item.toUpperCase();
        var depCap = answer.department.toUpperCase();
        //check to see if this item is already in stock
      connection.query(
        "INSERT INTO products SET ?",
        {
          item: itemCap,
          department: depCap,
          price: answer.price,
          stock: answer.stock
        },
        function(err) {
          if (err) throw err;
          console.log("New product has been added");
          start();
        }
      );
    });
}