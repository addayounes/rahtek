"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Notifications",
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        from: {
          type: Sequelize.UUID,
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
          allowNull: true,
        },
        to: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
        },
        event: { type: Sequelize.STRING, allowNull: false },
        payload: { type: Sequelize.JSONB, allowNull: true },
        read: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        createdAt: { type: Sequelize.DATE, allowNull: false },
        updatedAt: { type: Sequelize.DATE, allowNull: false },
      },
      { tableName: "Notifications", timestamps: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Notifications");
  },
};
