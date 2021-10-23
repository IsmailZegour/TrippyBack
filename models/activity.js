module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("activity", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      destination_id: {
        type: Sequelize.STRING,
      },
      travel_id: {
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
    });

    return Activity;
  };
  