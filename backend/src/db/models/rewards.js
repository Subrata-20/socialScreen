const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const rewards = sequelize.define(
    'rewards',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      points: {
        type: DataTypes.INTEGER,
      },

      description: {
        type: DataTypes.TEXT,
      },

      earned_on: {
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

  rewards.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.rewards.belongsTo(db.users, {
      as: 'child',
      foreignKey: {
        name: 'childId',
      },
      constraints: false,
    });

    db.rewards.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.rewards.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return rewards;
};
