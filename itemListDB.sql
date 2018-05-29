DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(100) NOT NULL,
  sales INT default 0,
  department VARCHAR(45) NOT NULL,
  price INT default 0,
  stock INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (item, department, price, stock)
VALUE
    ("LCD TV","ELECTRONICS", 500, 100),
    ("IPOD TOUCH","ELECTRONICS", 200, 0),
    ("BEATS WIRELESS HEADPHONES","ELECTRONICS", 100, 50),
    ("FACE LOTION","COSMETICS", 15, 25),
    ("MASCARA","COSMETICS", 12, 0),
    ("SMUCKERS SANDWICHES","GROCERY", 8, 50),
    ("HOT FRIES","GROCERY", 2, 250),
    ("BROWNIES","GROCERY", 5, 3),
    ("SNEAKERS","APPAREL", 60, 200),
    ("JEANS","APPAREL", 30, 12);