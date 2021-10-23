module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      travel_id: {
        type: Sequelize.STRING,
      },
      activity_id: {
          type: Sequelize.STRING,
      },
      destination_id: {
          type: Sequelize.STRING,
      },
      localisation: {
          type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
      }
    });

    return Post;
  };
  