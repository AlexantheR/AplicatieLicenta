const express = require('express')
const router = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');

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
    const { email } = req.body;

    const sendPremiumConfirmationEmail = async (email) => {
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
                subject: 'Activare cont Premium',
                text: 'Felicitări! Acum sunteți un utilizator premium. Vă mulțumim pentru plata de 25 RON.',
            };

            await transport.sendMail(message);
        } catch (error) {
            throw error;
        }
    };


    try {

        await sendPremiumConfirmationEmail(email);
        const user = await User.findOne({ email });
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
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
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