import express from "express";
import { generateReport } from "./controllers";
const CustomerRoutes = express.Router();

CustomerRoutes.get('/generate-report', generateReport);

export default CustomerRoutes;
