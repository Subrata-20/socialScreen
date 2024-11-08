const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('family_manager'),
        name: 'family_manager',
        createdAt,
        updatedAt,
      },

      { id: getId('parent'), name: 'parent', createdAt, updatedAt },

      { id: getId('guardian'), name: 'guardian', createdAt, updatedAt },

      { id: getId('mentor'), name: 'mentor', createdAt, updatedAt },

      { id: getId('child'), name: 'child', createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'achievements',
      'rewards',
      'screen_time_recommendations',
      'sentiment_check_ins',
      'tasks',
      'roles',
      'permissions',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('mentor'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('child'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('CREATE_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('READ_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('UPDATE_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('DELETE_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('READ_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('UPDATE_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('DELETE_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('mentor'),
        permissionId: getId('READ_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('child'),
        permissionId: getId('READ_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('CREATE_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('READ_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('UPDATE_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('DELETE_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('READ_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('UPDATE_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('DELETE_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('mentor'),
        permissionId: getId('READ_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('child'),
        permissionId: getId('READ_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('CREATE_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('READ_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('UPDATE_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('DELETE_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('READ_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('UPDATE_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('DELETE_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('mentor'),
        permissionId: getId('READ_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('child'),
        permissionId: getId('READ_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('CREATE_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('READ_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('UPDATE_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('DELETE_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('READ_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('UPDATE_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('DELETE_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('mentor'),
        permissionId: getId('READ_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('child'),
        permissionId: getId('READ_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('CREATE_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('READ_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('UPDATE_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('DELETE_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('CREATE_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('READ_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('UPDATE_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('DELETE_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('DELETE_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('mentor'),
        permissionId: getId('READ_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('child'),
        permissionId: getId('READ_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_manager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('mentor'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('child'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ACHIEVEMENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ACHIEVEMENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ACHIEVEMENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ACHIEVEMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_REWARDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_REWARDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_REWARDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_REWARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SCREEN_TIME_RECOMMENDATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_SCREEN_TIME_RECOMMENDATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_SCREEN_TIME_RECOMMENDATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_SCREEN_TIME_RECOMMENDATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SENTIMENT_CHECK_INS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_SENTIMENT_CHECK_INS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_SENTIMENT_CHECK_INS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_SENTIMENT_CHECK_INS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_TASKS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_TASKS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_TASKS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_TASKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'family_manager',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'parent',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
