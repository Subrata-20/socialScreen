const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const sentiment_check_ins = sequelize.define(
    'sentiment_check_ins',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      response: {
        type: DataTypes.TEXT,
      },

      sentiment: {
        type: DataTypes.ENUM,

        values: ['positive', 'neutral', 'negative'],
      },

      check_in_date: {
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

  sentiment_check_ins.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.sentiment_check_ins.belongsTo(db.users, {
      as: 'child',
      foreignKey: {
        name: 'childId',
      },
      constraints: false,
    });

    db.sentiment_check_ins.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.sentiment_check_ins.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return sentiment_check_ins;
};
