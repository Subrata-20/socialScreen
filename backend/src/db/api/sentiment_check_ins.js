const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Sentiment_check_insDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sentiment_check_ins = await db.sentiment_check_ins.create(
      {
        id: data.id || undefined,

        response: data.response || null,
        sentiment: data.sentiment || null,
        check_in_date: data.check_in_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await sentiment_check_ins.setChild(data.child || null, {
      transaction,
    });

    return sentiment_check_ins;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const sentiment_check_insData = data.map((item, index) => ({
      id: item.id || undefined,

      response: item.response || null,
      sentiment: item.sentiment || null,
      check_in_date: item.check_in_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const sentiment_check_ins = await db.sentiment_check_ins.bulkCreate(
      sentiment_check_insData,
      { transaction },
    );

    // For each item created, replace relation files

    return sentiment_check_ins;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sentiment_check_ins = await db.sentiment_check_ins.findByPk(
      id,
      {},
      { transaction },
    );

    await sentiment_check_ins.update(
      {
        response: data.response || null,
        sentiment: data.sentiment || null,
        check_in_date: data.check_in_date || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await sentiment_check_ins.setChild(data.child || null, {
      transaction,
    });

    return sentiment_check_ins;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sentiment_check_ins = await db.sentiment_check_ins.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of sentiment_check_ins) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of sentiment_check_ins) {
        await record.destroy({ transaction });
      }
    });

    return sentiment_check_ins;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sentiment_check_ins = await db.sentiment_check_ins.findByPk(
      id,
      options,
    );

    await sentiment_check_ins.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await sentiment_check_ins.destroy({
      transaction,
    });

    return sentiment_check_ins;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const sentiment_check_ins = await db.sentiment_check_ins.findOne(
      { where },
      { transaction },
    );

    if (!sentiment_check_ins) {
      return sentiment_check_ins;
    }

    const output = sentiment_check_ins.get({ plain: true });

    output.child = await sentiment_check_ins.getChild({
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

      if (filter.response) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'sentiment_check_ins',
            'response',
            filter.response,
          ),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              check_in_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              check_in_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.check_in_dateRange) {
        const [start, end] = filter.check_in_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            check_in_date: {
              ...where.check_in_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            check_in_date: {
              ...where.check_in_date,
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

      if (filter.sentiment) {
        where = {
          ...where,
          sentiment: filter.sentiment,
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
          count: await db.sentiment_check_ins.count({
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
      : await db.sentiment_check_ins.findAndCountAll({
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
          Utils.ilike('sentiment_check_ins', 'check_in_date', query),
        ],
      };
    }

    const records = await db.sentiment_check_ins.findAll({
      attributes: ['id', 'check_in_date'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['check_in_date', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.check_in_date,
    }));
  }
};
