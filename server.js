//call once somewhere in the beginning of the app
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
//Use dotenv
require("dotenv").config();

//--CONNECTION---//
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("DB connection success!!");
  init();
});
//USE inquirer prompt with call back function

const init = () => {
  inquirer
    .prompt({
      name: "main",
      type: "list",
      message: "What do you need to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then((choices) => {
      switch (choices.main) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View All Departments":
          viewAllDepartments();

          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          console.log("Back to main menu: ${select.main}");
          break;
      }
    })
    .catch((err) => console.err(err));
};

///ADD DEPARTMENT
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Department Name?",
      },
    ])
    .then((department) => {
      connection.query("INSERT INTO department SET ?", department, (error) => {
        init();
      });
    });
};
//ADD ROLES
const addRole = () => {
  connection.query(
    "SELECT name, id AS value FROM department",
    (error, departmentNames) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "Role's title?",
          },
          {
            type: "input",
            name: "salary",
            message: "Role's salary?",
          },
          {
            type: "list",
            name: "department_id",
            message: "Department ID?",
            choices: departmentNames,
          },
        ])
        .then((role) => {
          connection.query("INSERT INTO role SET ?", role, () => {
            init();
          });
        });
    }
  );
};
//ADD EMPLOYEE
const addEmployee = () => {
  connection.query(
    `SELECT id AS a value, title AS a name FROM role`,
    (err, Roles) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: Roles,
          },
        ])
        .then((Employee) => {
          connection.query("INSERT INTO employee SET ?", Employee, (error) => {
            init();
          });
        });
    }
  );
};
//VIEW ALL DEPARTMENTS
function viewAllDepartments() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function (error, information) {
      if (error) throw err;
      cTable(information);
      init();
    }
  );
}
//VIEW ALL ROLES
function viewAllRoles() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function (error, information) {
      if (error) throw err;
      console.log(error);
      cTable(information);
      init();
    }
  );
}
//VIEW ALL EMPLOYEES
function viewAllEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (error, information) {
      if (error) throw err;
      cTable(information);
      init();
    }
  );
}
//UPDATE ROLES
const updateRole = () => {
  connection.query(
    "SELECT id AS value, CONCAT(first_name, ` ` , last_name) AS name FROM employee",
    (error, Employees) => {
      connection.query(
        "SELECT id AS value, title AS name FROM role",
        (error, Roles) => {
          inquirer
            .prompt([
              {
                type: "list",
                name: "id",
                message: "Do yo wanna update employee table?",
                choices: Employees,
              },
              {
                type: "list",
                name: "role_id",
                message: "Do yo wanna update  role table?",
                choices: Roles,
              },
            ])
            .then((answers) => {
              connection.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [answers.role_id, answers.id],
                (error) => {
                  init();
                }
              );
            });
        }
      );
    }
  );
};

init();
