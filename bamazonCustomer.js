var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    queryConnect();
});

var total = 0;

function queryConnect() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (total === 0) {
            print(res);
        }
        else {
            start(res);
        }
    });
}

function print(res) {
    var table = new Table({
        head: ['ID', 'ITEM', 'DEPARTMENT', 'PRICE', 'STOCK'],
        colWidths: [5, 30, 15, 10, 10]
    });
    for (var i = 0; i < res.length; i++) {
        table.push(
            [res[i].id, res[i].item, res[i].department, res[i].price, res[i].stock]
        );
    }
    console.log(table.toString());
    start(res);
}

function start(res) {
    inquirer
        .prompt([
            {
                name: "item_ID",
                type: "input",
                message: "What is the item number of the product you'd like to buy? ",
                validate: function (value) {
                    if (isNaN(value) === false && value <= res.length && value > 0) {
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
            if (answer.amount > res[answer.item_ID - 1].stock) {
                console.log("Insufficient Quantity");
                askRedo();
            }
            else {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock:
                                (res[answer.item_ID - 1].stock - parseInt(answer.amount)),
                            sales:
                                res[answer.item_ID - 1].sales + parseInt(answer.amount)
                        },
                        {
                            id: answer.item_ID
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        else {
                            console.log("Your selection has been added to your cart");
                            askRedo();
                        }
                    }

                )
                total += (res[answer.item_ID - 1].price * answer.amount)
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
                queryConnect();
            }
            else {

                console.log("Thank you for choosing Bamazon! Your total is: $", total);
                connection.end();
            }
        });
}