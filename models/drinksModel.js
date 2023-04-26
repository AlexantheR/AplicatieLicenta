const mongoose = require("mongoose");

const drinkSchema = mongoose.Schema({
    name: {
        type: String,
        require,
    },
    price: {
        type: Number,
        require,
    },
    category: {
        type: String,
        require,
    }
},
    {
        timestamps: true,
    })

const drinkModel = mongoose.model("drinks", drinkSchema);

module.exports = drinkModel;