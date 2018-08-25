var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    productList();
});

function productList() {
    let query = "SELECT * FROM products";

    connection.query(query, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`\nID: ${res[i].item_id}\n`, `Product Name: ${res[i].product_name}\n`, `Department: ${res[i].department_name}\n`, `Price: $${res[i].price}`);
        }
        console.log(`\n-------------------`);

        customerOrder();
    })

}

function validation(value) {
    if (isNaN(value) === false) {
        return true;
    } else {
        return 'Enter a number';
    }
}

function customerOrder() {
    inquirer.prompt([
        {
            name: "purchase",
            type: "input",
            message: "Welcome to Bamazon! What is the the ID of the product they would like to buy?",
            validate: validation
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like to buy?",
            validate: validation
        }
    ])
        .then(function (answers) {
            console.log('____________________________________________________')
            let queryOne = "SELECT * FROM products WHERE ? ";
            connection.query(queryOne, { item_id: answers.purchase }, function (err, res) {
                if (err) throw err;
                if (answers.amount > res[0].stock_quantity) {
                    console.log('Sorry! We do not have enough stock to fulfill your request.');
                    console.log('____________________________________________________')
                } else {
                    let stock = res[0].stock_quantity - answers.amount;
                    let totalCost = res[0].price * answers.amount;
                    let query = "UPDATE products SET stock_quantity = " + stock + " WHERE item_id = " + answers.purchase;

                    connection.query(query, function (err, res) {
                        if (err) throw err;
                    })
                    console.log("Your order: " + res[0].product_name + " | $" + res[0].price);
                    console.log("Your Order has been fulfilled! The total cost is $" + parseFloat(totalCost).toFixed(2));
                    console.log('____________________________________________________')
                }
                connection.end();
            })
        })
}