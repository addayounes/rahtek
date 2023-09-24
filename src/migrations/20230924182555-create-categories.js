"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Categories",
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        name: { type: Sequelize.STRING, allowNull: false },
      },
      { tableName: "Categories" }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Categories");
  },
};
