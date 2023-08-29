"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "RefreshToken",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        token: { type: Sequelize.STRING, allowNull: false },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Users", key: "id" },
        },
      },
      { tableName: "RefreshTokens" }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RefreshTokens");
  },
};
