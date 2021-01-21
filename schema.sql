DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT AUTO INCREMENT PRIMARY KEY,
  name  VARCHAR(100) NOT NULL
);

CREATE TABLE role(
    id INT INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
)

CREATE TABLE employee(
    id INT AUTO INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL
)

INSERT INTO department (name)
VALUES ("Sales")

INSERT INTO role (title, salary, department_id )
VALUES ("Sales Lead", 80000, 2)

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Kevin", "Applebottom", 1, 1)