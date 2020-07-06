// by Shivam Shukla

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

// Connecting
connect.then((db) => {

    console.log("Connected to MongoDB!");

    // Creating a new Dish
    let newDish = Dishes({
        name: "Pizza",
        description: "test"
    });

    // Saving the dish to the database.
    newDish.save().then((dish) => {
        console.log(dish);

        // Finding all the dishes and using exec to ensure that find() is executed and it will return a promise.
        return Dishes.find({}).exec();

    }).then((dishes) => {

        console.log("\n\nFound Dishes : \n\n");
        console.log(dishes);

        // Now returning the promise after deleting all the dishes
        return Dishes.remove({});

    }).then(() => {

        // After removing the dishes, now closing the connection.
        return mongoose.connection.close();

    }).catch((err) => {
        console.log("Something went wrong! ", err);
    });
});