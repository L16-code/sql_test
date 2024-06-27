import { Request, Response } from "express";

import CustomerService from "./services";

export const generateReport = async (req: Request, res: Response) => {
    try {
        const report = await CustomerService.generateReport();
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error });
    }
};