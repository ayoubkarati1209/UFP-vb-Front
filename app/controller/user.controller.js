const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.first_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Shareholders
    const users = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.email,
        type_id: req.body.type_id,
        authorized: req.body.authorized
    };

    // Save Shareholders in the database
    Users.create(users)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};
exports.findOne = (req, res) => {
    const email = req.params.email;

    Users.findOne({ where: { username: email, authorized: 1 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Spac with email=" + email
            });
        });
};