module.exports = (sequelize, Sequelize) => {
    const Destination = sequelize.define("destination", {
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
      starting_date: {
          type: Sequelize.STRING,
      },
      ending_date: {
          type: Sequelize.STRING,
      },
      destination: {
          type: Sequelize.STRING,
      }
    });

    return Destination;
  };
  