const express = require("express");
const router = express.Router();
const Pizza = require("../models/pizzaModel");

router.get("/getallpizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addpizza", async (req, res) => {

  const pizza = req.body.pizza

  try {
    const newpizza = new Pizza({
      name: pizza.name,
      image: pizza.image,
      variants: ['mica', 'medie', 'mare'],
      description: pizza.description,
      category: pizza.category,
      prices: [pizza.prices]
    })
    await newpizza.save()
    res.send('Pizza noua adaugata cu succes')
  } catch (error) {
    return res.status(400).json({ message: error });
  }

});

router.post("/getpizzabyid", async (req, res) => {

  const pizzaid = req.body.pizzaid

  try {
    const pizza = await Pizza.findOne({ _id: pizzaid })
    res.send(pizza)
  } catch (error) {
    return res.status(400).json({ message: error });
  }

});

router.post("/editpizza", async (req, res) => {

  const editedpizza = req.body.editedpizza

  try {
    const pizza = await Pizza.findOne({ _id: editedpizza._id })

    pizza.name = editedpizza.name,
      pizza.description = editedpizza.description,
      pizza.image = editedpizza.image,
      pizza.category = editedpizza.category,
      pizza.prices = [editedpizza.prices]

    await pizza.save()

    res.send('Detalii pizza modificate cu succes')

  } catch (error) {
    return res.status(400).json({ message: error });
  }

});

router.post("/deletepizza", async (req, res) => {

  const pizzaid = req.body.pizzaid

  try {
    await Pizza.findOneAndDelete({ _id: pizzaid })
    res.send('Pizza stearsa cu succes')
  } catch (error) {
    return res.status(400).json({ message: error });
  }

});

module.exports = router;
