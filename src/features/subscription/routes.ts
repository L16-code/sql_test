import express from "express";
import { checkOverlap, createSubscription } from "./controllers";
const SubscriptionRoutes = express.Router();

SubscriptionRoutes.post("/create-sub", createSubscription);
SubscriptionRoutes.get("/check-overlap", checkOverlap);
export default SubscriptionRoutes;