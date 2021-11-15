const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');
const mysql = require('mysql2');


db.connect(err =>
{
    if (err) throw err;

    console.log('Employee Tracker Iniatated');

    menu();
})

// FUNCTIONS
function menu()
{
    inquirer.prompt([
        {
            name: 'menu',
            type: 'list',
            message: "What would you like to do: ",
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
        }
    ])
        .then(response =>
        {
            switch (response.menu)
            {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployee();
                    break;
                case 'Quit':
                    connection.end();
                    break;
            }
        })
};

function viewDepartments()
{
    db.query('SELECT * FROM department', (error, result) =>
    {
        if (error) throw error;

        console.table(result);

        menu();
    })
};


function viewRoles()
{
    db.query('SELECT * FROM role', (error, result) =>
    {
        if (error) throw error;

        console.table(result);

        menu();
    })
};

function viewEmployees()
{
    db.query('SELECT * FROM employee', (error, result) =>
    {
        if (error) throw error;

        console.table(result);

        menu();
    })
};

// 'ADD' FUNCTIONS
function addDepartment()
{
    inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'Input the department name: '
    }])
        .then(response =>
        {
            db.query('INSERT INTO department (department_name) VALUES (?)', [response.name], (error, result) =>
            {
                if (error) throw error;
            })

            viewDepartments();
        })
};


function addRole()
{
    let deptNamesArray = [];
    const sql = 'SELECT * FROM department'
    db.query(sql, (error, response) =>
    {
        if (error) throw error;

        response.forEach((department) => { deptNamesArray.push(department.department_name) });
    })

    inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'Input the role title: '
    },
    {
        name: 'salary',
        type: 'number',
        message: 'Input salary: ',
        validate: salary =>
        {
            if (salary)
            {
                return true;
            } else
            {
                console.log('Please enter a numerical value');
                return false;
            }
        }
    },
    {
        name: 'department',
        type: 'list',
        message: 'Select from departments:',
        choices: deptNamesArray
    },
    ])
        .then(res =>
        {
            console.log(res.name, res.department, res.salary)

            // db.query('SELECT department.id FROM department WHERE department.department_name=(?)', [res.department], (error, result) =>
            // {
            //     if (error) throw error;

            //     console.log(result[0])
            //     let dep = result[0]
            //     console.log(dep.id)


            db.query('INSERT INTO role SET ?', {
                title: res.name,
                salary: res.salary,
                department: res.department
            },

                (err, res) =>
                {
                    if (err) throw err;
                    console.log('Role has been added')

                    viewRoles()
                })
        })
    // })
};

function addEmployee()
{
    let rolesArray = [];
    const sql = 'SELECT * FROM role'
    db.query(sql, (error, response) =>
    {
        if (error) throw error;

        response.forEach((role) => { rolesArray.push(role.title) });
    })

    let managerArray = [];
    const sql2 = 'SELECT * FROM employee'
    db.query(sql2, (error, response2) =>
    {
        if (error) throw error;

        response2.forEach((employee) => { managerArray.push(employee.manager) });
    })


    let deptNamesArray = [];
    const sql3 = 'SELECT * FROM department'
    db.query(sql3, (error, response3) =>
    {
        if (error) throw error;

        response3.forEach((department) => { deptNamesArray.push(department.department_name) });
    })

    inquirer.prompt([{
        name: 'firstName',
        type: 'input',
        message: 'Input first name of employee: '
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'Input last name of employee: '
    },
    {
        name: 'role',
        type: 'list',
        message: 'Select role:',
        choices: rolesArray
    },
    {
        name: 'manager',
        type: 'list',
        message: 'Select reporting manager:',
        choices: managerArray
    },
    {
        name: 'department',
        type: 'list',
        message: 'Select from departments:',
        choices: deptNamesArray
    },
    {
        name: 'salary',
        type: 'number',
        message: 'Input salary: ',
        validate: salary =>
        {
            if (salary)
            {
                return true;
            } else
            {
                console.log('Please enter a numerical value');
                return false;
            }
        }
    },
    ])
        .then(res =>
        {

            console.log(res.firstName, res.lastName, res.role, res.manager, res.department, res.salary)

            db.query('INSERT INTO employee SET ?', {
                first_name: res.firstName,
                last_name: res.lastName,
                title: res.role,
                department: res.department,
                salary: res.salary,
                manager: res.manager
            },

                (err, res) =>
                {
                    if (err) throw err;
                    console.log('Employee has been added.')

                    viewEmployees()
                })
        })
};

function updateEmployee()
{
    let employeeNameArray = [];
    const sql = 'SELECT * FROM employee'
    db.query(sql, (error, response) =>
    {

        if (error) throw error;

        response.forEach((employee) => { employeeNameArray.push(employee.first_name), (employee.last_name) });
    })

    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Input new role',
        },
        {
            type: 'list',
            name: 'firstName',
            message: 'Select employee',
            choices: employeeNameArray
        }

    ])
        .then(res =>
        {
            console.log(res.firstName, res.role)

            db.query('UPDATE employee SET title = ? WHERE employee.first_name = ? ', [res.role, res.firstName],

                (err, res) =>
                {
                    if (err) throw err;

                    viewEmployees();
                })
        })
};