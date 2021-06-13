var cors = require('cors')

module.exports = app => {
    const news = require("../controller/news.controller");

    var router = require("express").Router();

    // Create a new News
    router.post("/", news.create);

    // Retrieve all News
    router.get("/", news.findAll);
    router.get("/:idnews", news.findOne);
    router.put("/:idnews", news.update);
    router.delete("/:idnews", news.delete);
    app.use('/api/news', cors(), router);
};