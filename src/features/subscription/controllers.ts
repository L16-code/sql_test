import { Request, Response } from "express";
import SubscriptionService from "./services";
export async function createSubscription(req: Request, res: Response) {
    try {
        const result = await SubscriptionService.createSubscription(req.body);
        res.status(201).json({ result });
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function checkOverlap(req: Request, res: Response) {
    try {
        const subcriptions = await SubscriptionService.checkOverlap();
        res.status(200).json(subcriptions);
    } catch (error) {
        res.status(500).json({ error });
    }
}