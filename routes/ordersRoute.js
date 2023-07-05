const { v4: uuidv4 } = require('uuid')
const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_51MxrSbBLFgjsWwKCOS2diP0rp2Bav8JbBo4jsD3Tl6QwhucSY9kt0fZnsIY0eV3BTatgZxRfyCVi5zrZzDWcRB6W00Zx8Yn3Nr')
const Order = require('../models/orderModel')
const nodemailer = require('nodemailer');

router.post('/placeorder', async (req, res) => {
    const { token, subtotal, currentUser, cartItems } = req.body;

    const sendInvoiceEmail = async (token, subtotal) => {
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
                to: token.email,
                subject: `Comanda cu id-ul ${token.card.id}`,
                text:
                    `Multumim pentru comanda! Puteti vedea detaliile mai jos:\n\n` +
                    'Produse comandate:\n' +
                    cartItems
                        .map(
                            (item) =>
                                item.name +
                                ' ' +
                                item.quantity +
                                ' x ' +
                                item.price +
                                ' = ' +
                                item.price * item.quantity
                        )
                        .join('\n') +
                    '\n' +
                    `Total: ${subtotal} RON\n` +
                    `Adresa: ${token.card.address_line1}, ${token.card.address_city}, ${token.card.address_country}, ${token.card.address_zip}`,
            };

            await transport.sendMail(message);
        } catch (error) {
            throw error;
        }
    };

    try {
        // Send email invoice
        await sendInvoiceEmail(token, subtotal);

        if (token.paymentMethod === 'card') {
            // Create customer and process payment with Stripe
            const customer = await stripe.customers.create({
                email: token.email,
                source: token.id,
            });

            const payment = await stripe.charges.create(
                {
                    amount: subtotal * 100,
                    currency: 'RON',
                    customer: customer.id,
                    receipt_email: token.email,
                },
                {
                    idempotencyKey: uuidv4(),
                }
            );

            if (payment) {
                // Save the order in the database
                const neworder = new Order({
                    name: currentUser.name,
                    email: currentUser.email,
                    userid: currentUser._id,
                    orderItems: cartItems,
                    orderAmount: subtotal,
                    shippingAddress: {
                        street: token.card.address_line1,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        pincode: token.card.address_zip,
                    },
                    transactionId: payment.source.id,
                });

                await neworder.save();

                res.send('Plata efectuata');
            } else {
                res.send('Plata esuata');
            }
        } else if (token.paymentMethod === 'ramburs') {
            // Save the order in the database for cash payment
            const neworder = new Order({
                name: currentUser.name,
                email: currentUser.email,
                userid: currentUser._id,
                orderItems: cartItems,
                orderAmount: subtotal,
                paymentMethod: 'Ramburs',
                shippingAddress: {
                    street: token.address,
                    city: token.city,
                    country: token.country,
                    pincode: token.postalCode,
                },
            });

            await neworder.save();

            res.send('Comanda plasata pentru plata ramburs');
        } else {
            res.status(400).json({ message: 'Metoda de plata invalida' });
        }
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Ceva nu a mers bine!' });
    }
});

router.post('/placeorder/card', async (req, res) => {
    const { token, subtotal, currentUser, cartItems } = req.body;

    const sendInvoiceEmail = async (token, subtotal) => {
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
                to: token.email,
                subject: `Comanda card cu id-ul ${token.card.id}`,
                text:
                    `Multumim pentru comanda! Puteti vedea detaliile mai jos:\n\n` +
                    'Produse comandate:\n' +
                    cartItems
                        .map(
                            (item) =>
                                item.name +
                                ' ' +
                                item.quantity +
                                ' x ' +
                                item.price +
                                ' = ' +
                                item.price * item.quantity
                        )
                        .join('\n') +
                    '\n' +
                    `Total: ${subtotal} RON\n` +
                    `Adresa: ${token.card.address_line1}, ${token.card.address_city}, ${token.card.address_country}, ${token.card.address_zip}`,
            };

            await transport.sendMail(message);
        } catch (error) {
            throw error;
        }
    };

    try {
        // Send email invoice
        await sendInvoiceEmail(token, subtotal);

        // Create customer and process payment with Stripe
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const payment = await stripe.charges.create(
            {
                amount: subtotal * 100,
                currency: 'RON',
                customer: customer.id,
                receipt_email: token.email,
            },
            {
                idempotencyKey: uuidv4(),
            }
        );

        if (payment) {
            // Save the order in the database for card payment
            const neworder = new Order({
                name: currentUser.name,
                email: currentUser.email,
                userid: currentUser._id,
                orderItems: cartItems,
                orderAmount: subtotal,
                paymentMethod: 'Card',
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip,
                },
                transactionId: payment.source.id,
            });

            await neworder.save();

            res.send('Plata efectuata');
        } else {
            res.send('Plata esuata');
        }
    } catch (error) {
        console.error('Error placing card order:', error);
        res.status(500).json({ message: 'Ceva nu a mers bine!' });
    }
});

router.post('/placeorder/cash', async (req, res) => {
    const { token, subtotal, currentUser, cartItems } = req.body;

    const sendInvoiceEmail = async (token, subtotal) => {
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
                to: currentUser.email,
                subject: `Comanda ramburs`,
                text:
                    `Multumim pentru comanda! Puteti vedea detaliile mai jos:\n\n` +
                    'Produse comandate:\n' +
                    cartItems
                        .map(
                            (item) =>
                                item.name +
                                ' ' +
                                item.quantity +
                                ' x ' +
                                item.price +
                                ' = ' +
                                item.price * item.quantity +
                                ' RON'
                        )
                        .join('\n') +
                    '\n' +
                    `Total: ${subtotal} RON\n` +
                    `Adresa: ${token.street}, ${token.city}, ${token.country}, ${token.pincode}`,
            };

            await transport.sendMail(message);
        } catch (error) {
            throw error;
        }
    };

    try {
        // Send email invoice
        await sendInvoiceEmail(token, subtotal);

        // Save the order in the database for cash payment
        const neworder = new Order({
            name: currentUser.name,
            email: currentUser.email,
            userid: currentUser._id,
            orderItems: cartItems,
            orderAmount: subtotal,
            paymentMethod: 'Ramburs',
            shippingAddress: {
                street: token.street,
                city: token.city,
                country: token.country,
                pincode: token.pin,
            },
            transactionId: 'Ramburs'
        });

        await neworder.save();

        res.send('Comanda plasata pentru plata ramburs');
    } catch (error) {
        console.error('Error placing cash order:', error);
        res.status(500).json({ message: 'Ceva nu a mers bine!' });
    }
});

router.post('/getuserorders', async (req, res) => {
    const { userid } = req.body

    try {
        const orders = await Order.find({
            userid: userid
        }).sort({ _id: -1 })
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: 'Ceva nu a mers bine!' })
    }
})

router.get("/getallorders", async (req, res) => {

    try {
        const orders = await Order.find({})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/deliverorder", async (req, res) => {

    const orderid = req.body.orderid
    try {
        const order = await Order.findOne({ _id: orderid })
        order.isDelivered = true
        await order.save()
        res.send('Comanda trimisa cu succes')
    } catch (error) {

        return res.status(400).json({ message: error });

    }

});

router.post("/cancelorder", async (req, res) => {
    const orderid = req.body.orderid;
    try {
        const order = await Order.findOne({ _id: orderid });
        order.isDelivered = false;
        await order.save();
        res.send('Comanda anulata cu succes');
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



module.exports = router