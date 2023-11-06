"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
            first_name: { type: Sequelize.STRING, allowNull: false },
            last_name: { type: Sequelize.STRING, allowNull: false },
            email: { type: Sequelize.STRING, allowNull: true, unique: true },
            phone: { type: Sequelize.STRING, allowNull: true, unique: true },
            wilaya: { type: Sequelize.JSONB, allowNull: true },
            town: { type: Sequelize.JSONB, allowNull: true },
            slug: { type: Sequelize.STRING, allowNull: true },
            photo: { type: Sequelize.STRING, allowNull: true },
            identity_card: { type: Sequelize.STRING, allowNull: true },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
                values: ["RECIPIENT", "SUPPLIER"],
            },
            password: { type: Sequelize.STRING, allowNull: true },
            googleId: { type: Sequelize.STRING, allowNull: true },
            facebookId: { type: Sequelize.STRING, allowNull: true },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
