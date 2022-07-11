"use strict";

import { Model, UUIDV4 } from "sequelize";
import { IUserAttributes } from "../interfaces/types/models/user.model.types";

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<IUserAttributes> implements IUserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    surname!: string;
    email!: string;
    password!: string;
    phone!: string;
    static associate(models: any) {
      // define association here
      User.hasMany(models.Article);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
      },
      surname: {
        type: DataTypes.STRING(100),
      },
      phone: {
        type: DataTypes.STRING(10),
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
