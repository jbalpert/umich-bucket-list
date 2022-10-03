import { Request, Response } from 'express';
import { googleAuthService, googleAuthRefreshService } from '../services/auth';
// Authenticate a user with google
export const googleAuth = async (req: Request, res: Response) => {
    try {
        const response = await googleAuthService(req.body.code);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const googleAuthRefresh = async (req: Request, res: Response) => {
    const { tokens } = req.body.refreshToken;
    try {
        const credentials = await googleAuthRefreshService(tokens);
        res.status(200).json(credentials);
    } catch (error) {
        res.status(400).json(error);
    }
}