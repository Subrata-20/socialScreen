const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class RewardsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const rewards = await db.rewards.create(
      {
        id: data.id || undefined,

        points: data.points || null,
        description: data.description || null,
        earned_on: data.earned_on || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await rewards.setChild(data.child || null, {
      transaction,
    });

    return rewards;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const rewardsData = data.map((item, index) => ({
      id: item.id || undefined,

      points: item.points || null,
      description: item.description || null,
      earned_on: item.earned_on || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const rewards = await db.rewards.bulkCreate(rewardsData, { transaction });

    // For each item created, replace relation files

    return rewards;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const rewards = await db.rewards.findByPk(id, {}, { transaction });

    await rewards.update(
      {
        points: data.points || null,
        description: data.description || null,
        earned_on: data.earned_on || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await rewards.setChild(data.child || null, {
      transaction,
    });

    return rewards;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const rewards = await db.rewards.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of rewards) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of rewards) {
        await record.destroy({ transaction });
      }
    });

    return rewards;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const rewards = await db.rewards.findByPk(id, options);

    await rewards.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await rewards.destroy({
      transaction,
    });

    return rewards;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const rewards = await db.rewards.findOne({ where }, { transaction });

    if (!rewards) {
      return rewards;
    }

    const output = rewards.get({ plain: true });

    output.child = await rewards.getChild({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'child',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('rewards', 'description', filter.description),
        };
      }

      if (filter.pointsRange) {
        const [start, end] = filter.pointsRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            points: {
              ...where.points,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            points: {
              ...where.points,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.earned_onRange) {
        const [start, end] = filter.earned_onRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            earned_on: {
              ...where.earned_on,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            earned_on: {
              ...where.earned_on,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.child) {
        const listItems = filter.child.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          childId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.rewards.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.rewards.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('rewards', 'description', query),
        ],
      };
    }

    const records = await db.rewards.findAll({
      attributes: ['id', 'description'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['description', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.description,
    }));
  }
};
