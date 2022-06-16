const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Outline extends Model {}

Outline.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comfort_zone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        character_desire: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        new_situation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        character_adapts: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gets_desire: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        heavy_price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        familiar_situation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        character_changed: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'outline'
    }
);

module.exports = Outline;
