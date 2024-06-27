import mysql from "mysql2/promise";
import envConfig from "../config/envConfig";
const env = envConfig();
const db = env.databse_name
const host = env.host
export const pool = mysql.createPool({
    host: host,
    user: "root",
    password: "",
    database: db,
});

export const createTables = async () => {
    const createSubscriptionsTable = `
    CREATE TABLE IF NOT EXISTS subscriptions (
    user_id VARCHAR(100) PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
    );`
    const createCustomerTable = `
    CREATE TABLE IF NOT EXISTS customer (
        customer_id VARCHAR(100) PRIMARY KEY,
        cust_name VARCHAR(125) NOT NULL,
        city VARCHAR(125) NOT NULL,
        grade INTEGER NOT NULL,
        salesman_id VARCHAR(100) NOT NULL
    );
    `
    const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
        ord_no VARCHAR(100) PRIMARY KEY,
        purch_amt DOUBLE NOT NULL,
        ord_date DATE NOT NULL,
        customer_id VARCHAR(100) NOT NULL,
        salesman_id VARCHAR(100) NOT NULL
    );`
    const createSalesmanTable = `
    CREATE TABLE IF NOT EXISTS salesman (
        salesman_id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        city VARCHAR(125) NOT NULL,
        commission DOUBLE NOT NULL
    );`
    const insertCustomerData = `
    INSERT INTO customer (customer_id, cust_name, city, grade, salesman_id) VALUES
        ('3002', 'Nick Rimando', 'New York', 100, '5001'),
        ('3007', 'Brad Davis', 'New York', 200, '5001'),
        ('3005', 'Graham Zusi', 'California', 200, '5002'),
        ('3008', 'Julian Green', 'London', 300, '5002'),
        ('3004', 'Fabian Johnson', 'Paris', 300, '5006'),
        ('3009', 'Geoff Cameron', 'Berlin', 100, '5003'),
        ('3003', 'Jozy Altidore', 'Moscow', 200, '5007');`
    const insertOrderData=`
    INSERT INTO orders (ord_no, purch_amt, ord_date, customer_id, salesman_id) VALUES
        ('70001', 150.5, '2012-10-05', '3005', '5002'),
        ('70009', 270.65, '2012-09-10', '3001', '5005'),
        ('70002', 65.26, '2012-10-05', '3002', '5001'),
        ('70004', 110.5, '2012-08-17', '3009', '5003'),
        ('70007', 948.5, '2012-09-10', '3005', '5002'),
        ('70005', 2400.6, '2012-07-27', '3007', '5001'),
        ('70008', 5760, '2012-09-10', '3002', '5001');`
    const insertSalesmanData=`
    INSERT INTO salesman (salesman_id, name, city, commission) VALUES
        ('5001', 'James Hoog', 'New York', 0.15),
        ('5002', 'Nail Knite', 'Paris', 0.13),
        ('5005', 'Pit Alex', 'London', 0.11),
        ('5006', 'Mc Lyon', 'Paris', 0.14),
        ('5007', 'Paul Adam', 'Rome', 0.13),
        ('5003', 'Lau Son Hen', 'San Jose', 0.12);
    `
    ;

    const connection = await pool.getConnection();
    // {{ i have inserted the data by the above queries so tht whys i am not running this again and again}}
    // await connection.execute(createSubscriptionsTable);
    // await connection.execute(createCustomerTable);
    // await connection.execute(createOrdersTable);
    // await connection.execute(createSalesmanTable);
    // await connection.execute(insertCustomerData);
    // await connection.execute(insertOrderData);
    // await connection.execute(insertSalesmanData);


    connection.release();
};
createTables()
    .then(() => {
        console.log("Tables created successfully.");
    })
    .catch((error) => {
        console.error("Error creating tables:", error);
    });
