var cors = require('cors')

module.exports = app => {
    const users = require("../controller/user.controller");

    var router = require("express").Router();

    // Create a new admin_details
    router.post("/", users.create);
    router.get("/:email", users.findOne);
    app.use('/api/user', cors(), router);
};