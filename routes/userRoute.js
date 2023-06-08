const express = require('express')
const router = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {

    const { name, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword })
        newUser.save()
        res.send(User[0])
        // res.send(newUser)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})


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