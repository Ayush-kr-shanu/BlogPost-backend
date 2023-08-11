const {User}=require("./users.model")
const {PostHead}=require("./postHead.models")

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
      type: sequelize.INTEGER,
      allowNull: false,
    },
    postId: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
  });

  User.hasMany(Comment);
  Comment.belongsTo(User);

  PostHead.hasMany(Comment);
  Comment.belongsTo(PostHead);


  return Comment;
};
