const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Including dish model to perform db operation on dishes collection.
const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
    .get((req, res, next) => {

        Dishes.find({})
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                // Sending dishes back as res body.
                res.json(dishes);
            }, (err) => next(err)) // We can handle error this way or using catch. Here we simply passing the error to our error handler.
            .catch((err) => next(err));
    })
    .post((req, res, next) => {

        Dishes.create(req.body) // We are passing req.body as this is the post req, and data is contained in req.body.
            .then((dish) => {
                console.log("Dish Created : \n", dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => next(err));

    })
    .put((req, res, next) => {

        res.statusCode = 403 // forbidden
        res.end("PUT is not supported for /dishes. You must provide the dishID to update the particular dish")

    })
    .delete((req, res, next) => {

        Dishes.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });



dishRouter.route('/:dishID')
    .get((req, res, next) => {

        // Finding dish by Dish ID.
        Dishes.findById(req.params.dishID)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => next(err));

    }).post((req, res, next) => {

        res.statusCode = 403 // forbidden
        res.end("POST is not supported for /dishes/:dishID.")

    }).put((req, res, next) => {

        // Updating a particular dish with given dish ID.
        Dishes.findByIdAndUpdate(req.params.dishID, { $set: req.body }, { new: true })
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => next(err));

    }).delete((req, res, next) => {

        Dishes.findByIdAndRemove(req.params.dishID)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => next(err));
    });


module.exports = dishRouter;