import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password || username.trim() === '' || password.trim() === '' || email.trim() === '') {
        next(errorHandler(400, 'All fields are required'))
        

        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Use hashed password
        });

        try {
            await newUser.save();
            res.json('Signup successful');
        } catch (error) {
            next(error)
        }
    };
}
