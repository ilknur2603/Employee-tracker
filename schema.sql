DROP DATABASE IF EXISTS employee_tracker_DB;
CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id)
);
USE employee_tracker_DB;

INSERT INTO department (name)
VALUES
("HR"),
("Sales"),
("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES
("HR Manager",15000,1),
("HR Asistant",10000,1),
("Sales Manager",20000,2),
("Sales Asistant",17000,2),
("Marketing Manager",25000,3),
("Marketing Asistant",21000,3);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES
("Skyler", "Smith", 1, NULL),
("Herbert", "Bloom", 2, 1),
("Vanessa",  "Green", 3, 2),
("Taylor", "Tyson", 4, 4),
("Chealsea", "Brown", 4, 5),
("Savannah", "Lopez", 5,6);