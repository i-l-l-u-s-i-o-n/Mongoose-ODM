const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    // It will add 2 fields: createdAt and updatedAt to each document.
    timestamps: true
});


// The name 'Dish' in the model is used to create a collection with plural of Dish i.e Dishes and in lowercase.
// So on creating model, the collection will be created named 'dishes'.
let Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;