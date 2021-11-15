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
INSERT INTO role (title, salary, department) 
VALUES
    ('CEO', 250000, 'Sales'),
    ('Lead Engineer', 150000, 'Engineering'),
    ('Engineer', 120000, 'Engineering'),
    ('Legal Team Lead', 250000, 'Legal'),
    ('Lawyer', 160000, 'Legal'),
    ('Sales Lead', 90000, 'Sales'),
    ('Salesperson', 80000, 'Sales'),
    ('Finance Lead', 130000, 'Finance'),
    ('Accountant', 125000, 'Finance');

-- Employee Seeds --
INSERT INTO employee (first_name, last_name, title, department, salary, manager) 
VALUES 
('Alex', 'Johnson', 'CEO', 'Finance', 250000, 'Self'),
('Creed', 'Nowel', 'Lead Engineer', 'Engineering', 150000, 'Sarah Lourd'),
('Mike', 'Anderson', 'Engineer', 'Engineering', 150000, 'Sarah Lourd'),
('Bob', 'Huffmann', 'Legal Team Lead', 'Legal', 250000, 'Kevin Brown'),
('Kevin', 'Mak', 'Lawyer', 'Legal', 160000, 'Kevin Brown'),
('Mary', 'Brown', 'Sales Lead', 'Sales', 90000, 'Ashley Rodriguez'),
('Al', 'Bondi', 'Salesperson', 'Sales', 80000, 'Ashley Rodriguez'),
('Abbey', 'Costa', 'Finance Lead', 'Finance', 130000, 'John Doe'),
('Don', 'Camren', 'Accountant', 'Finance', 125000, 'John Doe');