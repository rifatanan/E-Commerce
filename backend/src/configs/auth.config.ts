import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const encodeToken = (email:string, id:string) =>{
    const SECRET_KEY = process.env.JWT_SECRET || "mysecret";
    const payload = {
        email: email,
        id: id,
    };

    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: "7d",
    });

    return token;
};

const decodeToken = (token:string) => {
    try {
        const SECRET_KEY = process.env.JWT_SECRET || "mysecret";
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error:any) {
        return null
    }
}

const authConfigs = { encodeToken, decodeToken};

export default authConfigs;