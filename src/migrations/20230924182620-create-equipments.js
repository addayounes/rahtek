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
        wilaya: { type: Sequelize.JSONB, allowNull: true },
        town: { type: Sequelize.JSONB, allowNull: true },
        slug: { type: Sequelize.STRING, allowNull: true, unique: true },
        status: {
          type: Sequelize.TEXT,
          allowNull: false,
          // values: ["AVAILABLE", "TAKEN"],
          defaultValue: "AVAILABLE",
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
        createdAt: { type: Sequelize.DATE, allowNull: false },
        updatedAt: { type: Sequelize.DATE, allowNull: false },
      },
      { tableName: "Equipments", timestamps: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Equipments");
  },
};
