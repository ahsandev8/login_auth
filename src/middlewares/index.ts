import express from "express";
import { get, merge } from "lodash";

import { config } from "../config/keys";
import { getUserBySessionToken } from "../services/users";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        const { id } = req.params;

        const currenUserid = get(req, "identity._id") as string;

        if (!currenUserid) {
            return res.sendStatus(403);
        }

        if (currenUserid.toString() !== id) {
            return res.sendStatus(403)
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        const sessionToken = req.cookies[config.cookies_secrat];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

}
