module.exports = (sequelize, Sequelize) => {
    const Industry = sequelize.define("industries", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_overviews: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });

    return Industry;
};