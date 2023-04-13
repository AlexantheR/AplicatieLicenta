const express = require('express')
const router = express.Router();
const user = require('../models/userModel')


router.post('/register', async (req, res) => {

    const { name, email, password } = req.body

    const newUser = new user({ name, email, password })

    try {
        newUser.save()
        res.send(user[0])
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

module.exports = router