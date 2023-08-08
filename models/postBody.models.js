module.exports = (sequelize, DataTypes) => {
  const PostBody = sequelize.define("PostBody", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postHeadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "PostHead",
        field: "id"
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  return PostBody;
};
