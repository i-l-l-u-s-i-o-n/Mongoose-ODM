const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json())

promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 202;
        res.setHeader('Content-Type', 'text/plain')
        next()
    })
    .get((req, res) => {
        res.end("Here is the list of all the promotions.")
    })
    .post((req, res) => {
        res.end("Will add the promo to the database: " + req.body.name + " with description : " + req.body.desc)
    })
    .put((req, res) => {
        res.statusCode = 403 // forbidden
        res.end("PUT is not supported for /promotions. You must provide the promotionID to update the particular record")
    })
    .delete((req, res) => {
        res.end("Deleting all the records.")
    });



promoRouter.route('/:promoID')
    .all((req, res, next) => {
        res.statusCode = 202;
        res.setHeader('Content-Type', 'text/plain')
        next()
    })
    .get((req, res) => {
        res.end("Here is the list of promotion: " + req.params.promoID)
    }).post((req, res) => {
        res.statusCode = 403 // forbidden
        res.end("POST is not supported for /promotions/:promoID.")
    }).put((req, res) => {
        res.write("Updating promotion ID : " + req.params.promoID + "\n")
        res.end("Will update promotion: " + req.body.name + " with description : " + req.body.desc)
    }).delete((req, res) => {
        res.end("Deleting promo ID : " + req.params.promoID)
    });

module.exports = promoRouter