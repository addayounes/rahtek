import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { User } from "./user";

export interface IPatientAttributes {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  medical_record: string;
  represented_by: string;
}

export const Patient = sequelize.define<Model<IPatientAttributes, {}>>(
  "Patients",
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: true },
    medical_record: { type: DataTypes.STRING, allowNull: true },
    represented_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "Patients",
    timestamps: true,
  }
);

User.hasMany(Patient, {
  foreignKey: "id",
  as: "patients",
  onDelete: "CASCADE",
});
Patient.belongsTo(User, { foreignKey: "represented_by", as: "user" });
