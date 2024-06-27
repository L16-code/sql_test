import { pool } from "../../db/dbConnect";
class CustomerService{
    async generateReport() {
        const connection = await pool.getConnection();

        try {
            const [data] = await pool.query(
                `SELECT 
                    customer.cust_name AS customer_name,
                    customer.city AS customer_city,
                    orders.ord_no AS order_number,
                    orders.ord_date AS order_date,
                    orders.purch_amt AS order_amount,
                    salesman.name AS salesman_name,
                    salesman.commission AS salesman_commission,
                    CASE 
                        WHEN  orders.ord_no IS NULL THEN 'No orders'
                        WHEN orders.salesman_id = customer.salesman_id THEN 'Order through salesman'
                        ELSE 'Order by themselves'
                    END AS order_status
                FROM 
                    customer 
                LEFT JOIN 
                    orders ON customer.customer_id = orders.customer_id
                LEFT JOIN 
                    salesman ON orders.salesman_id = salesman.salesman_id
                ORDER BY 
                    customer.cust_name, orders.ord_no;`
            );

            return data;
        } finally {
            connection.release();
        }
    }
}
export default new CustomerService;