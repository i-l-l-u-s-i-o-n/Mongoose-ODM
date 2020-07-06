// by Shivam Shukla

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

// Connecting
connect.then((db) => {

    console.log("Connected to MongoDB!");

    Dishes.create({

        name: "Pizza_Grill",
        description: "test"

    }).then((dish) => {

        console.log(dish);

        // Finding the just inserted dish using it's _id and updating it 
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: "Updated description" },
        }, {
            new: true // we are doing this as we want the result back after update.
        }).exec();

    }).then((dish) => {

        console.log("\n\nUpdated Dish : \n\n");
        console.log(dish);

        // Inserting comment to the dish
        dish.comments.push({
            rating: 5,
            comment: 'I\m getting a sinking feeling!',
            author: 'Lee'
        })

        return dish.save();

    }).then((dish) => {

        console.log(dish);
        return Dishes.remove();

    })

    .then(() => {

        // After removing the dishes, now closing the connection.
        return mongoose.connection.close();

    }).catch((err) => {
        console.log("Something went wrong! ", err);
    });
});

// OUTPUT


// Connected to MongoDB!{
//         _id: 5 f034f9c6b131b214e548e3c,
//         name: 'Pizza_Grill',
//         description: 'test',
//         comments: [],
//         createdAt: 2020 - 07 - 06 T16: 21: 48.949 Z,
//         updatedAt: 2020 - 07 - 06 T16: 21: 48.949 Z,
//         __v: 0
//     }

//     Updated Dish:


//     {
//         _id: 5 f034f9c6b131b214e548e3c,
//         name: 'Pizza_Grill',
//         description: 'Updated description',
//         comments: [],
//         createdAt: 2020 - 07 - 06 T16: 21: 48.949 Z,
//         updatedAt: 2020 - 07 - 06 T16: 21: 48.970 Z,
//         __v: 0
//     } {
//         _id: 5 f034f9c6b131b214e548e3c,
//         name: 'Pizza_Grill',
//         description: 'Updated description',
//         comments: [{
//             _id: 5 f034f9c6b131b214e548e3d,
//             rating: 5,
//             comment: 'Im getting a sinking feeling!',
//             author: 'Lee'
//         }],
//         createdAt: 2020 - 07 - 06 T16: 21: 48.949 Z,
//         updatedAt: 2020 - 07 - 06 T16: 21: 48.995 Z,
//         __v: 1
//     }