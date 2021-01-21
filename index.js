// server in sql
const { O_DIRECTORY } = require("constants");
const inquirer = require("inquirer");
const mysql = require("mysql");
const { listenerCount } = require("process");
const { async } = require("rxjs");
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  firstQ();
});

async function firstQ() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do???",
      choices: ["list", "add", "update", "remove", "exit"],
      name: "crud",
    },
  ]);

  switch (answers.crud) {
    case "list":
      listfunc();
      break;

    case "add":
      // function not yet created
      addfunc();
      break;

    case "update":
      // function not yet created
      updatefunc();
      break;

    case "remove":
      // function not yet created
      deletefunc();
      break;

    default:
      connection.end();
      break;
  }
}

// functions

// read function connects to list
function listfunc() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, roles.title, department.department, employee.manager ,roles.salary FROM employee JOIN roles ON employee.role_id=roles.id JOIN department ON roles.department_id=department.id",
    function (err, res) {
      if (err) throw err;
      else console.log("completed");
      console.table(res);
      firstQ();
    }
  );
}

// write function connects to add
async function addfunc() {
  const addanswers = await inquirer.prompt([
    {
      type: "text",
      message: "First Name",
      name: "first",
    },
    { type: "text", message: "Last Name", name: "second" },
    {
      type: "text",
      message: "Who is there Manager? (leave blank if none)",
      name: "managerName",
    },
    // { type: "text", message: "What is their role ID?", name: "roleid" },

    {
      type: "list",
      message: "What is their title?",
      choices: ["Manager", "Lead", "Grunt", "Intern"],
      name: "roletitle",
    },

    { type: "text", message: "What is their salary?", name: "rolesalary" },
    {
      type: "list",
      message: "What is their department",
      choices: ["Sales", "HR", "Intern", "Engineer"],
      name: "departmentName",
    },
  ]);

  let roleId = 4;

  switch (addanswers.roletitle) {
    case "Manager":
      roleId === 1;
      break;
    case "Lead":
      roleId === 2;
      break;
    case "Grunt":
      roleId === 3;
      break;

    default:
      roleId === 4;
      break;
  }

  connection.query(
    "INSERT INTO employee SET ?, INSERT INTO roles SET ?, INSERT INTO department SET ?",

    [
      {
        first_name: addanswers.first,
        last_name: addanswers.second,
        manager: addanswers.managerName,
      },
      {
        title: addanswers.roletitle,
        salary: addanswers.rolesalary,
        id: addanswers.roleId,
      },
      { department: addanswers.departmentName },
    ],
    function (err, res) {
      if (err) throw err;
      else console.log("completed");
      console.table(res);
      firstQ();
    }
  );
}
