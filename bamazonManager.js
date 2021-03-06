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
    console.log("connected as id " + connection.threadId + "\n");
    displayOptions();
});

function validation(value) {
    if (isNaN(value) === false) {
        return true;
    } else {
        return 'Enter a number';
    }
}

function viewItem() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("****************************** INVENTORY ******************************")
        for (i = 0; i < res.length; i++) {
            console.log(`\nID: ${res[i].item_id}\n`, `Product Name: ${res[i].product_name}\n`, `Department: ${res[i].department_name}\n`, `Price: $${res[i].price}\n`, `Stock Quantity: ${res[i].stock_quantity}`);

        }
        console.log(`\n-------------------`);
        connection.end();
    })
}

function displayOptions() {
    inquirer.prompt([
        {
            name: "menu",
            type: "list",
            message: "Menu Options",
            choices: [
                "View products for sale",
                "View low inventory",
                "Add to inventory",
                "Add new product",
            ]
        }
    ])
        .then(answers => {
            if (answers.menu === "View products for sale") {
                viewItem();

            }
            else if (answers.menu === "View low inventory") {
                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;
                    console.log("****************************** LOW INVENTORY ******************************")
                    for (i = 0; i < res.length; i++) {
                        if (res[i].stock_quantity <= 5) {
                            console.log(`\nID: ${res[i].item_id}\n`, `Product Name: ${res[i].product_name}\n`, `Department: ${res[i].department_name}\n`, `Price: $${res[i].price}\n`, `Stock Quantity: ${res[i].stock_quantity}`);
                        }
                        console.log(`\n-------------------`);
                    }
                    connection.end();
                })
            }
            else if (answers.menu === "Add to inventory") {
                inquirer.prompt([
                    {
                        name: 'add',
                        type: 'input',
                        message: 'Input ID of the product you wish to add (Enter a number)',
                        validate: validation
                    },
                    {
                        name: 'amount',
                        type: 'input',
                        message: 'Input the amount you wish to add (Enter a number)',
                        validate: validation
                    }
                ])
                    .then(function (answers) {
                        console.log('____________________________________________________')
                        let queryOne = "SELECT * FROM products WHERE ? ";
                        connection.query(queryOne, { item_id: answers.add }, function (err, res) {
                            if (err) throw err;

                            let amount = parseInt(answers.amount);
                            let product = res[0].product_name;
                            let stock = res[0].stock_quantity + amount;
                            let query = "UPDATE products SET stock_quantity = " + stock + " WHERE item_id = " + answers.add;

                            connection.query(query, function (err, res) {
                                if (err) throw err;
                                console.log("****************************** ITEM ADDED ******************************");
                                console.log(`\nProduct Name: ${product}\n`, `${amount} added`)
                            })

                            connection.end();
                        })
                    })
            }
            else if (answers.menu === "Add new product") {
                inquirer.prompt([
                    {
                        name: 'name',
                        type: 'input',
                        message: 'Enter name of the product you wish to add',
                    },
                    {
                        name: 'department',
                        type: 'input',
                        message: 'Enter the department of the product you wish to add',
                    },
                    {
                        name: 'price',
                        type: 'input',
                        message: 'Enter price of the product you wish to add',
                        validate: validation
                    },
                    {
                        name: 'amount',
                        type: 'input',
                        message: 'Enter amount of the product you wish to add',
                        validate: validation
                    },
                ])
                    .then(function (answers) {
                        var item = answers.name;
                        var department = answers.department;
                        var price = parseInt(answers.price);
                        var stock = parseInt(answers.amount);
                        var query = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('${item}', '${department}', ${price}, ${stock});`;
                        connection.query(query, function (err, res) {
                            if (err) throw err;

                            console.log(`You have successfully added ${item}`);
                            connection.end();
                        })
                    })
            }
        })
}
