const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 202;
        res.setHeader('Content-Type', 'text/plain')
        next()
    })
    .get((req, res) => {
        res.end("Here is the list of all the leaders.")
    })
    .post((req, res) => {
        res.end("Will add the leader to the database: " + req.body.name + " with description : " + req.body.desc)
    })
    .put((req, res) => {
        res.statusCode = 403 // forbidden
        res.end("PUT is not supported for /leader. You must provide the leaderID to update the particular leader")
    })
    .delete((req, res) => {
        res.end("Deleting all the leaders.")
    });



leaderRouter.route('/:leaderID')
    .all((req, res, next) => {
        res.statusCode = 202;
        res.setHeader('Content-Type', 'text/plain')
        next()
    })
    .get((req, res) => {
        res.end("Here is the list of leader: " + req.params.leaderID)
    }).post((req, res) => {
        res.statusCode = 403 // forbidden
        res.end("POST is not supported for /leaders/:leaderID.")
    }).put((req, res) => {
        res.write("Updating leader ID : " + req.params.leaderID + "\n")
        res.end("Will update leader name : " + req.body.name + " with description : " + req.body.desc)
    }).delete((req, res) => {
        res.end("Deleting leader ID : " + req.params.leaderID)
    });


module.exports = leaderRouter;