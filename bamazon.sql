DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Disney Princess Scooter', 'Sports & Rec', 44.97, 10),
		('Sports Adult Blue Bike Helmet', 'Sports & Rec', 24.93, 50),
		('Swiss Army Camper Pocket Knife', 'Sports & Rec', 32.47, 300),
		('Radio Flyer Ranger Wagon', 'Sports & Rec', 229.06, 25),
		('Maple Recruit Complete Skateboard', 'Sports & Rec', 19.97, 10),
		('Gala Apples', 'Grocery', 0.60, 1000),
		('Roma Tomatoes'), 'Grocery', 0.35, 5000),
		('Blueberries 1 pint'), 'Grocery', 1.50, 500),
		('Green Bell Peppers'), 'Grocery', 0.82, 300),
		('Red Seedless Grapes 1 Bag'), 'Grocery', 6.12, 100),
		('Cosco Flash Stroller - Grey'), 'Baby', 74.97, 50),
		('Air Akron Car Seat'), 'Baby', 219.97, 10),
		('Evenflo High Chair'), 'Baby', 88.00, 50),
		('Baby Wipes - Unscented - 500pk'), 'Baby', 19.97, 500),
		('Baby Diaper Bag - Smokey Tote'), 'Baby', 99.97, 30),
		('RCA 32" LCD Television'), 'Electronics', 178.00, 20),
		('Apple iPad 32gb WIFI'), 'Electronics', 388.00, 20),
		('Google Home Mini'), 'Electronics', 45.00, 100),
		('ACER Chromebook'), 'Electronics', 278.00, 10),
		('16mb SD Memory Card'), 'Electronics', 19.95, 100)