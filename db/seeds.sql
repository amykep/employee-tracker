USE employee_trackerDB;

-- Department Seeds --
INSERT INTO department (id, department_name)
VALUES (1, 'Sales');

INSERT INTO department (id, department_name)
VALUES (2, 'Engineering');

INSERT INTO department (id, department_name)
VALUES (3, 'Finance');

INSERT INTO department (id, department_name)
VALUES (4, 'Legal');

-- Role Seeds --
INSERT INTO role (title, salary, department_id) 
VALUES
    ("CEO", 250000, 1),
    ("Lead Engineer", 150000, 2),
    ("Engineer", 120000, 2),
    ("Legal Team Lead", 250000, 3),
    ("Lawyer", 160000, 3),
    ("Sales Lead", 90000, 4),
    ("Salesperson", 80000, 4),
    ("Finance Lead", 130000, 5),
    ("Accountant", 125000, 5);

-- Employee Seeds --
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
('Alex', 'Johnson', 1, null),
('Creed', 'Nowel', 2,1),
('Mike', 'Anderson', 3, 2),
('Bob', 'Huffmann', 4, 1),
('Kevin', 'Mak', 5, 4),
('Mary', 'Brown', 6, 1),
('Al', 'Bondi', 7, 6),
('Abbey', 'Costa', 8, 1),
('Don', 'Camren', 9, 8);