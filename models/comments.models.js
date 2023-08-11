module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    postHeadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PostHead',
        key: 'id',
      },
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.PostHead, {
      foreignKey: 'postHeadId',
      as: 'postHead',
    });

    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };


  return Comment;
};
