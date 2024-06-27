import { pool } from "../../db/dbConnect";
import { ISubcscriptionData } from "./interface";
class SubscriptionService {
    async createSubscription(data: ISubcscriptionData) {
        const connection = await pool.getConnection();
        try {
            const { user_id, start_date, end_date } = data;
            const [result] = await pool.query(
                `INSERT INTO subscriptions (user_id, start_date, end_date) VALUES ("${user_id}", "${start_date}", "${end_date}")`
            );
            return result;
        } finally {
            connection.release();
        }
    }
    async checkOverlap() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await pool.query(
                `SELECT a.user_id AS User1, b.user_id AS User2,    
            CASE WHEN a.start_date <= b.end_date
            AND b.start_date <= a.end_date THEN
            'True' ELSE
            'False' END
            AS Overlap
            FROM subscriptions a
            JOIN subscriptions b ON a.user_id <> b.user_id;`
            );
            return rows;
        } finally {
            connection.release();
        }
    }
}
export default new SubscriptionService 