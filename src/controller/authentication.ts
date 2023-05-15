import express from "express";

import { config } from "../config/keys";
import { createUser, getUserByEmail } from "../services/users";
import { random, authentication } from "../helper"

export const login = async (req: express.Request, res: express.Response) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }


        const user = await getUserByEmail(email).select("+auth.salt +auth.password");

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.auth.salt, password);

        if (user.auth.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();

        user.auth.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie(config.cookies_secrat, user.auth.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);

    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            console.log(req.body);

            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            auth: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}