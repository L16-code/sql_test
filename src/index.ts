import bodyParser from "body-parser";
import express from "express";
import envConfig from "./config/envConfig";
import { createTables } from "./db/dbConnect";
import SubscriptionRoutes from "./features/subscription/routes";
import CustomerRoutes from "./features/customers/routes";
const app = express();

const env = envConfig();
const port = env.port;
app.use(bodyParser.json());
app.use("/", SubscriptionRoutes,CustomerRoutes);
createTables()
    .then(() => {
        console.log("Tables created successfully.");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Error creating tables:", error);
    });