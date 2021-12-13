const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    //field names & types (like column names)
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'large'
    },
    toppings: [] //or Array
});

//create the 'Pizza' model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;