module.exports = (sequelize, Sequelize) => {
    const Travel = sequelize.define("travel", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      starting_date: {
          type: Sequelize.STRING,
      },
      ending_date: {
          type: Sequelize.STRING,
      },
      description : {
          type: Sequelize.STRING(2200),
      },
      picture: {
          type: Sequelize.STRING,
      },
    });

    return Travel;
  };
  