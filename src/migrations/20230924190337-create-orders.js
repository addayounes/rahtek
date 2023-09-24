"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Orders",
      {
        patient_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Patients", key: "id" },
          onDelete: "CASCADE",
          primaryKey: true,
        },
        gaurantee_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
          primaryKey: true,
        },
        equipment_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Equipments", key: "id" },
          onDelete: "CASCADE",
          primaryKey: true,
        },
        date: { type: Sequelize.DATEONLY, allowNull: false, primaryKey: true },
        return_date: { type: Sequelize.DATE, allowNull: true },
        status: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ["PENDING", "ONGOING", "FINISHED"],
          defaultValue: "PENDING",
        },
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
