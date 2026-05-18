import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";
import {generateToken} from "../lib/jwt.js";

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    const userExists = await prisma.user.findUnique({
        where: {email: email},
    });

    if (userExists) {
        return res.status(400).json({error: "User with this email already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
    });

    //Generate JWT Token
    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email,
            },
            token,
        },
    });
};

export const loginUser = async (req, res) => {
    const  {email, password} = req.body;

    const user = await prisma.user.findUnique({
        where: {email: email},
    });
    if (!user) {
        return res.status(401).json({error: "Invalid email or password"});
    }

    //password verification
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({error: "Invalid email or password"});
    }

    //Generate JWT Token
    const token = generateToken(user.id, res);

    return {token, user};
};

export const logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
};