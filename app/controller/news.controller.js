const db = require("../models");
const News = db.news;
const Spacs = db.spacs;
const uploads = db.uploads;
const uploadFile = require("../middleware/upload");
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 15;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: spacs } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, spacs, totalPages, currentPage };
};

// Create and Save a new New
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a News
    const news = {
        date: req.body.date,
        title: req.body.title,
        description: req.body.description,
        spac_id: req.body.spac_id,
        id_types: req.body.id_types
    };

    // Save News in the database
    News.create(news)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the News."
            });
        });
};


// Retrieve all News from the database.
exports.findAll = (req, res) => {

    const { page, size, name } = req.query;
    var condition = name ? {
        name: {
            [Op.name]: `%${name}%`
        }
    } : null;


    db.news.findAll({
        where: condition,
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{
                model: db.spacs
            }

        ]
    }).then(news => {
        res.send(news)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving spacs."
        });
    });
};

exports.findOne = (req, res) => {
    const idnews = req.params.idnews;

    News.findByPk(idnews)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Spac with idnews=" + idnews
            });
        });
};
exports.update = (req, res) => {
    const idnews = req.params.idnews;

    News.update(req.body, {
            where: { id: idnews }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "News was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with idnews=${idnews}. Maybe News was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating News with idnews=" + idnews + err
            });
        });
};
exports.delete = (req, res) => {
    const idnews = req.params.idnews;
    News.destroy({
            where: { id: idnews }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "News was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete news with id=${idnews}. Maybe news was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete news with id=" + idnews
            });
        });
};