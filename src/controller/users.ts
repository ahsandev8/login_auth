import express from "express";

import { getUsers, deleteUserById, getUserById } from "../services/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {

        const users = await getUsers();

        return res.status(200).json(users);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const userDelete = await deleteUserById(id);

        return res.json(userDelete);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const updateUser = async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params;
        const { username } = req.body;

        const userUpdate = (await getUserById(id));

        userUpdate.username = username;
        await userUpdate.save();

        return res.json(userUpdate);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}