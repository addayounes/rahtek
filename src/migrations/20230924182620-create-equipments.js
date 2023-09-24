"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Equipments",
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        name: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING, allowNull: false },
        photo: { type: Sequelize.STRING, allowNull: false },
        status: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ["AVAILABLE", "TAKEN"],
        },
        category_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Categories", key: "id" },
          onDelete: "CASCADE",
        },
        published_by: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
        },
      },
      { tableName: "Equipments" }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Equipments");
  },
};
