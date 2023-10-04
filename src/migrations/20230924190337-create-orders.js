"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Orders",
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        patient_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Patients", key: "id" },
          onDelete: "CASCADE",
        },
        gaurantee_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
        },
        equipment_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Equipments", key: "id" },
          onDelete: "CASCADE",
        },
        date: { type: Sequelize.DATEONLY, allowNull: false },
        return_date: { type: Sequelize.DATE, allowNull: true },
        status: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ["PENDING", "ONGOING", "FINISHED", "REFUSED"],
          defaultValue: "PENDING",
        },
        createdAt: { type: Sequelize.DATE, allowNull: false },
        updatedAt: { type: Sequelize.DATE, allowNull: false },
      },
      {
        tableName: "Orders",
        timestamps: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
