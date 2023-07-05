const express = require('express')
const router = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');

// Helper function to generate a new random password
function generateNewPassword() {
    const length = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newPassword = '';

    for (let i = 0; i < length; i++) {
        newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return newPassword;
}

// Helper function to send password reset email
async function sendPasswordResetEmail(email, newPassword) {
    try {
        const transport = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'c47e34f6301bab',
                pass: 'de0f0e2f8d7e4c',
            },
        });

        const message = {
            from: 'adinu90@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `Your new password is: ${newPassword}`,
        };

        await transport.sendMail(message);
    } catch (error) {
        throw error;
    }
}


router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Adresa de email nu a fost gasita.' });
        }

        // Generate a new password
        const newPassword = generateNewPassword();

        // Update the user's password in the database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Send the new password to the user's email
        await sendPasswordResetEmail(email, newPassword);

        res.send('Password reset instructions sent to your email.');
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).send('Error resetting password.');
    }
});


router.get('/checkemail', async (req, res) => {
    const { email } = req.query;

    try {
        const existingUser = await User.findOne({ email });

        res.json({ unique: !existingUser });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Adresa de email exista deja.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.send(newUser);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const isPasswordMatched = await bcrypt.compare(password, user.password);
            if (isPasswordMatched) {
                const currentUser = {
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isPremium: user.isPremium,
                    _id: user._id
                };
                res.send(currentUser);
            } else {
                return res.status(400).json({ message: 'Autentificare esuata' });
            }
        } else {
            return res.status(400).json({ message: 'Autentificare esuata' });
        }
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


router.get("/getallusers", async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/deleteuser", async (req, res) => {

    const userid = req.body.userid

    try {
        await User.findOneAndDelete({ _id: userid })
        res.send('Utilizator sters cu succes!')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/makeuserpremium", async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilizatorul nu a fost gasit' });
        }

        user.isPremium = true;
        await user.save();

        res.json({ message: 'Utilizatorul a fost marcat ca Premium' });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/loseuserpremium", async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilizatorul nu a fost gasit' });
        }

        user.isPremium = false;
        await user.save();

        res.json({ message: 'Utilizatorul a pierdut statutul de Premium' });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router