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