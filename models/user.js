module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true,
    },
    last_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true,
    },
    gender: {
      type: Sequelize.STRING(20),
      allowNull: false,
      notEmpty: true,
    },
    birth_date : {
      type: Sequelize.STRING(20),
      allowNull: false,
      notEmpty: true,
    },
    username: {
      type: Sequelize.STRING(50),
      unique: {
        msg: 'The username is already taken'
      },
      allowNull: false,
      notEmpty: true,
    },
    description: {
      type: Sequelize.STRING(150),
    },
    profile_picture: {
      type: Sequelize.STRING,
      defaultValue: 'avatar_03.png',
    },
    banner_picture: {
      type: Sequelize.STRING,
      defaultValue: 'banner_03.png',
    }
  });

  return User;
};
