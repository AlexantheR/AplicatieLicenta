const { v4: uuidv4 } = require('uuid')
const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_51MxrSbBLFgjsWwKCOS2diP0rp2Bav8JbBo4jsD3Tl6QwhucSY9kt0fZnsIY0eV3BTatgZxRfyCVi5zrZzDWcRB6W00Zx8Yn3Nr')

router.post('/placeorder', async (req, res) => {
    const { token, subtotal, currentUser, cartItems } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create({
            amount: subtotal * 100,
            currency: 'ron',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })

        if (payment) {
            res.send('Payment done')
        } else {
            res.send('Payment failed')
        }

    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' })
    }
})


module.exports = router