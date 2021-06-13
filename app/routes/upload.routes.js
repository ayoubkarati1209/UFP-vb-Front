var cors = require('cors')

module.exports = app => {
    const upload = require("../controller/upload.controller");

    var router = require("express").Router();

    router.post("/upload", upload.upload);
    router.get("/files", upload.getListFiles);
    router.get("/files/:name", upload.download);
    app.use('/api/upload', cors(), router);
};