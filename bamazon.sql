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
VALUES  ('Lean UX: Designing Great Products with Agile Teams Hardcover', 'Books', 31.52, 50),
		('David and Goliath: Underdogs, Misfits, and the Art of Battling Giants Paperback', 'Books', 24.75, 50),
		('Superintelligence: Paths, Dangers, Strategies Paperback', 'Books', 18.30, 100),
		('Sapiens: A Brief History of Humankind Paperback', 'Books', 14.39, 100),
		('Deadpool 2 (Bilingual) [Blu-ray + Digital Copy]', 'Music, Movies, and TV Shows', 26.99, 500),
		('Jurassic World: Fallen Kingdom [BD Combo Pack] [Blu-ray]', 'Music, Movies, and TV Shows', 25.99, 1000),
		('Trick r Treat [Blu-ray]', 'Music, Movies, and TV Shows', 26.19, 500),
		('Firefly: The Complete Series [Blu-ray]'), 'Electronics', 14.99, 250),
		('Denon AH-MM400 Music Maniac Over-Ear Headphones'), 'Electronics', 374.90, 50),
		('Logitech MX Master 2S Wireless Mouse, Graphite'), 'Electronics', 107.99, 100)