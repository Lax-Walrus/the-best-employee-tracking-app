DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department  VARCHAR(100) NOT NULL
);

CREATE TABLE roles(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    manager_id INT,
    manager VARCHAR(100),
	role_id INT NOT NULL,
    FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
);

INSERT INTO department (department)
VALUES ("Sales"),("HR"),("Intern"),("Engineer");

INSERT INTO roles (title, salary,department_id)
VALUES ("Manager", 8000, 1),("Lead", 60000, 2),("Grunt", 40000,3)("Engineer", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kevin", "Applebottom", 1);

INSERT INTO employee (first_name, last_name, role_id,manager)
VALUES ("Kevin", "Bananabottom", 2, "Kevin Applebottom"),("Kevin", "Cantoloupebottom", 3, "Kevin Applebottom"), ("Kevin", "Durianbottom", 4, "Kevin Applebottom")

