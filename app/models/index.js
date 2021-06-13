const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});


// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.news = require("./news.model.js")(sequelize, Sequelize);
db.spacs = require("./spacs.model")(sequelize, Sequelize);
db.admins = require("./admins.model")(sequelize, Sequelize);
db.auxs = require("./auxs.model")(sequelize, Sequelize);
db.auxtypes = require("./auxtypes.model")(sequelize, Sequelize);
db.directors = require("./directors.model")(sequelize, Sequelize);
db.filings = require("./filings.model")(sequelize, Sequelize);
db.industries = require("./industries.model")(sequelize, Sequelize);
db.market = require("./market.model")(sequelize, Sequelize);
db.markettype = require("./markettype.model")(sequelize, Sequelize);
db.newstypes = require("./newstypes.model")(sequelize, Sequelize);
db.overviews = require("./overviews.model")(sequelize, Sequelize);
db.shareholders = require("./shareholders.model")(sequelize, Sequelize);
db.targets = require("./targets.model")(sequelize, Sequelize);
db.tickers = require("./tickers.model")(sequelize, Sequelize);
db.trusts = require("./trusts.model")(sequelize, Sequelize);
db.warrant_info = require("./warrant_info.model")(sequelize, Sequelize);
db.uploads = require("./uploads.model")(sequelize, Sequelize);
db.users = require("./users.model")(sequelize, Sequelize);
db.news.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.news, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.uploads.belongsTo(db.news, {
    foreignKey: 'news_id'
});
db.news.hasMany(db.uploads, {
    foreignKey: {
        name: 'news_id'
    }
});
db.warrant_info.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.warrant_info, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.overviews.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.overviews, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.directors.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.directors, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.admins.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.admins, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.directors.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.directors, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.overviews.hasMany(db.industries, {
    foreignKey: {
        name: 'id_overviews'
    }
});
db.industries.belongsTo(db.overviews, {
    foreignKey: 'id_overviews'
});
db.overviews.hasMany(db.targets, {
    foreignKey: {
        name: 'id_overviews'
    }
});
db.targets.belongsTo(db.overviews, {
    foreignKey: 'id_overviews'
});
db.filings.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.filings, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.market.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.market, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.shareholders.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.shareholders, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.tickers.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.tickers, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.trusts.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.trusts, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.auxs.belongsTo(db.spacs, {
    foreignKey: 'spac_id'
});
db.spacs.hasMany(db.trusts, {
    foreignKey: {
        name: 'spac_id'
    }
});
db.spacs.associate = function(models) {
    db.spacs.belongsTo(models.db.admins);
    db.spacs.belongsTo(models.db.directors);
    db.spacs.belongsToMany(models.db.overviews);
}
module.exports = db;