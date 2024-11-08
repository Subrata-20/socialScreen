const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Screen_time_recommendationsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const screen_time_recommendations =
      await db.screen_time_recommendations.create(
        {
          id: data.id || undefined,

          recommended_minutes: data.recommended_minutes || null,
          date: data.date || null,
          importHash: data.importHash || null,
          createdById: currentUser.id,
          updatedById: currentUser.id,
        },
        { transaction },
      );

    await screen_time_recommendations.setChild(data.child || null, {
      transaction,
    });

    return screen_time_recommendations;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const screen_time_recommendationsData = data.map((item, index) => ({
      id: item.id || undefined,

      recommended_minutes: item.recommended_minutes || null,
      date: item.date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const screen_time_recommendations =
      await db.screen_time_recommendations.bulkCreate(
        screen_time_recommendationsData,
        { transaction },
      );

    // For each item created, replace relation files

    return screen_time_recommendations;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const screen_time_recommendations =
      await db.screen_time_recommendations.findByPk(id, {}, { transaction });

    await screen_time_recommendations.update(
      {
        recommended_minutes: data.recommended_minutes || null,
        date: data.date || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await screen_time_recommendations.setChild(data.child || null, {
      transaction,
    });

    return screen_time_recommendations;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const screen_time_recommendations =
      await db.screen_time_recommendations.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
        transaction,
      });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of screen_time_recommendations) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of screen_time_recommendations) {
        await record.destroy({ transaction });
      }
    });

    return screen_time_recommendations;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const screen_time_recommendations =
      await db.screen_time_recommendations.findByPk(id, options);

    await screen_time_recommendations.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await screen_time_recommendations.destroy({
      transaction,
    });

    return screen_time_recommendations;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const screen_time_recommendations =
      await db.screen_time_recommendations.findOne({ where }, { transaction });

    if (!screen_time_recommendations) {
      return screen_time_recommendations;
    }

    const output = screen_time_recommendations.get({ plain: true });

    output.child = await screen_time_recommendations.getChild({
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

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.recommended_minutesRange) {
        const [start, end] = filter.recommended_minutesRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            recommended_minutes: {
              ...where.recommended_minutes,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            recommended_minutes: {
              ...where.recommended_minutes,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.dateRange) {
        const [start, end] = filter.dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
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
          count: await db.screen_time_recommendations.count({
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
      : await db.screen_time_recommendations.findAndCountAll({
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
          Utils.ilike('screen_time_recommendations', 'date', query),
        ],
      };
    }

    const records = await db.screen_time_recommendations.findAll({
      attributes: ['id', 'date'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['date', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.date,
    }));
  }
};
