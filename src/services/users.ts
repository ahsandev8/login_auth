import { UserModel } from "../model/users";



export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'auth.sessionToken': sessionToken
});


export const getUserById = (id: String) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: String) => UserModel.findByIdAndDelete({ _id: id });

export const updateUserById = (id: String, values: Record<string, any>) => UserModel.findByIdAndUpdate({ _id: id, values });
