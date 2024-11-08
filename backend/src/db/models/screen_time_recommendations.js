const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const screen_time_recommendations = sequelize.define(
    'screen_time_recommendations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      recommended_minutes: {
        type: DataTypes.INTEGER,
      },

      date: {
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

  screen_time_recommendations.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.screen_time_recommendations.belongsTo(db.users, {
      as: 'child',
      foreignKey: {
        name: 'childId',
      },
      constraints: false,
    });

    db.screen_time_recommendations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.screen_time_recommendations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return screen_time_recommendations;
};
