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
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    manager_id VARCHAR(100),
	role_id INT NOT NULL,
    fOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
);

INSERT INTO department (department)
VALUES ("Sales"),("HR");

INSERT INTO roles (title, salary,department_id)
VALUES ("Sales Lead", 80000, 1),("Hiring Officer", 80000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kevin", "Applebottom", 1);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Kevin", "Bananabottom", 1, "Kevin Applebottom" );