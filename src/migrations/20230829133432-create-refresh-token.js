"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "RefreshTokens",
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        token: { type: Sequelize.STRING, allowNull: false },
        type: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ["REFRESH", "RESET", "REGISTER"],
        },
        expiresAt: { type: Sequelize.DATE, allowNull: true },
        userId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
        },
      },
      { tableName: "RefreshTokens" }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RefreshTokens");
  },
};
