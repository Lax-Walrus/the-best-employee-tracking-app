// server in sql

const { O_DIRECTORY } = require("constants");
const inquirer = require("inquirer");
const mysql = require("mysql");
const { listenerCount } = require("process");
const { async } = require("rxjs");
const employeeArr = [];
let tempemp;
const departmentArr = ["Sales", "HR", "Service", "IT"];
const roleTitlesArr = ["Manager", "Lead", "Intern", "Engineer"];
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employeeDB",
  multipleStatements: true,
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
      choices: ["list", "add", "update", "exit"],
      name: "crud",
    },
  ]);

  switch (answers.crud) {
    case "list":
      listfunc();
      break;

    case "add":
      addemployee();
      break;

    case "update":
      // function not yet created
      updatefunc();
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
async function addemployee() {
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

    {
      type: "list",
      message: "What is their title?",
      choices: roleTitlesArr,
      name: "roletitle",
    },

    { type: "text", message: "What is their salary?", name: "rolesalary" },

    {
      type: "list",
      message: "What is their department",
      choices: departmentArr,
      name: "departmentName",
    },
  ]);
  let deptId;
  let roleId;

  switch (addanswers.roletitle) {
    case "Manager":
      roleId = 1;
      break;
    case "Lead":
      roleId = 2;
      break;
    case "Intern":
      roleId = 3;
      break;

    default:
      roleId = 4;
      break;
  }
  switch (addanswers.departmentName) {
    case "Sales":
      deptId = 1;
      break;
    case "HR":
      deptId = 2;
      break;
    case "Service":
      deptId = 3;
      break;
    default:
      deptId = 4;
      break;
  }

  console.log(addanswers.roletitle);
  connection.query(
    "INSERT INTO department SET ? ; INSERT INTO roles SET ?; INSERT INTO employee SET ?",

    [
      { department: addanswers.departmentName },

      {
        title: addanswers.roletitle,
        salary: addanswers.rolesalary,
        department_id: deptId,
      },
      {
        first_name: addanswers.first,
        last_name: addanswers.second,
        manager: addanswers.managerName,
        role_id: roleId,
      },
    ],
    function (err, res) {
      if (err) throw err;
      else console.log("completed");
      listfunc();
    }
  );
}

// updated function
async function updatefunc() {
  const updatedAns = await connection.query(
    "SELECT id, first_name, last_name FROM employee",
    function (err, res) {
      if (err) throw err;
      for (i in res) {
        tempemp = res;
        const employeefull = `${res[i].first_name} ${res[i].last_name}`;
        employeeArr.push(employeefull);
        console.log(employeeArr);
        tempemp = res;
      }
    }
  );
  inquirer.prompt([
    {
      type: "list",
      message: "Who gets a new role?",
      choices: employeeArr,
      name: "promotion",
    },
    {
      type: "list",
      message: "What is the new role?",
      choices: roleTitlesArr,
      name: "newroll",
    },
  ]);

  switch (updatedAns.newroll) {
    case "Manager":
      roleId = 1;
      break;
    case "Lead":
      roleId = 2;
      break;
    case "Intern":
      roleId = 3;
      break;

    default:
      roleId = 4;
      break;
  }

  connection.query(
    'UPDATE employee SET role_id = ? WHERE CONCAT(first_name, " " last_name) = ? ',
    function (err, res) {
      if (err) throw err;
      else console.log("completed");
      listfunc();
    }
  );
}
