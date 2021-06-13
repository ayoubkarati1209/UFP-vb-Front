var cors = require('cors')

module.exports = app => {
    const spacs = require("../controller/spac.controller");

    var router = require("express").Router();

    // Create a new admin_details
    router.post("/", spacs.create);
    router.get("/", spacs.findAll);
    router.get("/:idspac", spacs.findOne);

    app.use('/api/spacs', cors(), router);
};