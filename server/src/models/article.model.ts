"use strict";
import * as Sequelize from "sequelize";
import { Model, UUIDV4 } from "sequelize";
import { IArticleAttributes } from "../interfaces/types/models/article.model.types";

export interface IArticleInstance extends IArticleAttributes {}

module.exports = (sequelize: any, DataTypes: any) => {
  class Article
    extends Model<IArticleAttributes>
    implements IArticleAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    title!: string;
    text!: string;
    type!: string;
    static associate(models: any) {
      // define association here
      Article.belongsTo(models.User);
    }
  }
  Article.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING(500),
      },
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
