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
    print();
});

function print() {
    connection.query("SELECT * FROM products", function (err, res) {
        //print as pretty table
        for (var i = 0; i < res.length; i++) {
            console.log("id: " + res[i].id + " item: " + res[i].item + " department: " + res[i].department + " price: " + res[i].price + " stock: " + res[i].stock);
        }
        start(res);
    });
}

function start(res) {
    inquirer
        .prompt([
            {
                name: "item_ID",
                type: "input",
                message: "What is the item number of the product you'd like to buy? ",
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
                message: "How many would you like to buy? ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\n Invalid input, please try again");
                    return false;
                }
            }
        ]).then(function (answer) {
            //why is this bugging out when i try to purchase a second thing in the same run?
            if (answer.amount > res[answer.item_ID - 1].stock) {
                console.log("Insufficient Quantity");
                start();
            }
            else {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock:
                                (res[answer.item_ID - 1].stock - parseInt(answer.amount))
                        },
                        {
                            id: answer.item_ID
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        else {
                            console.log("Your purchase is confirmed");
                            askRedo();
                        }
                    }

                )
            }
        })
}

function askRedo() {
    inquirer
        .prompt([
            {
                name: "decision",
                type: "list",
                message: "Would you like to make any other purchases? ",
                choices: ["Yes", "No"]
            }
        ]).then(function (answer) {
            if (answer.decision === "Yes") {
                start();
            }
            else console.log("Thank you for shopping at Bamazon!");
            connection.end();
        });
}