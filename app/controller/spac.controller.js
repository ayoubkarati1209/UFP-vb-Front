const db = require("../models");
const Spacs = db.spacs;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Shareholders
    const spacs = {
        name: req.body.name,
        cik: req.body.cik,
    };

    // Save Shareholders in the database
    Spacs.create(spacs)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Shareholders."
            });
        });
};

// Retrieve all shareholders from the database.
exports.findAll = (req, res) => {
    Spacs.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Shareholders."
            });
        });
};
exports.findOne = (req, res) => {
    const idspac = req.params.idspac;

    Spacs.findByPk(idspac)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Spac with idnews=" + idspac
            });
        });
};