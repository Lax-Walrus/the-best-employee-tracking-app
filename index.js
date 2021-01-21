// server in sql
const { O_DIRECTORY } = require("constants");
const inquirer = require("inquirer");
const mysql = require("mysql");
const { listenerCount } = require("process");
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
