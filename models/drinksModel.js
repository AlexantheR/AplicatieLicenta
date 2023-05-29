const mongoose = require("mongoose");

const drinkSchema = mongoose.Schema({
    name: {
        type: String,
        require,
    },
    prices: [],
    category: {
        type: String,
        require,
    },
    image: {
        type: String,
        require,
    },
},
    {
        timestamps: true,
    })

const drinkModel = mongoose.model("drinks", drinkSchema);

module.exports = drinkModel;