module.exports = (sequelize, Sequelize) => {
    const Secret = sequelize.define("secret", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: {msg:'user_id cannot be null'},
      },
      mail: {
          type: Sequelize.STRING(80),
          isEmail: true,
          unique: {
            msg: 'An account with this email already exists'
          },
          allowNull: false,
          notEmpty: true,
      },
      phone_number: {
          type: Sequelize.STRING,
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
          notEmpty: true,
      }
    });

    return Secret;
  };
  