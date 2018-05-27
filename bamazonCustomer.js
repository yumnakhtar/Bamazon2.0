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

        //how to print without hard coding???
        // console.table([
        //     {
        //       item: res[0].item,
        //       department: res[0].department,
        //       price: res[0].price,
        //       stock: res[0].stock
        //     }
        //   ]);

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
                //how to confirm only number is inputted
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to buy? ",
                //how to confirm only number is inputted??
            }
        ]).then(function (answer) {
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock: 
                        // (res[answer.item_ID - 1].stock > parseInt(answer.amount))  
                        (res[answer.item_ID - 1].stock - parseInt(answer.amount))
                    },
                    {
                        id: answer.item_ID
                    }
                ],
                function (err) {
                    if (err) throw err;
                    else {
                        console.log("your purchase is confirmed");
                        print();
                    }
                }

            )
        })
}