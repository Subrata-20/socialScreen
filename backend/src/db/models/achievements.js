const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const achievements = sequelize.define(
    'achievements',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      achieved_on: {
        type: DataTypes.DATE,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  achievements.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.achievements.belongsTo(db.users, {
      as: 'child',
      foreignKey: {
        name: 'childId',
      },
      constraints: false,
    });

    db.achievements.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.achievements.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return achievements;
};
