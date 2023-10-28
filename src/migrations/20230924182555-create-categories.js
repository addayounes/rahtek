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
                createdAt: { type: Sequelize.DATE, allowNull: false },
                updatedAt: { type: Sequelize.DATE, allowNull: false },
            },
            { tableName: "Categories", timestamps: true }
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Categories");
    },
};
