module.exports = (sequelize, Sequelize) => {
    const Relationship = sequelize.define("relationships", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      requester_id: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
      },
      addressee_id: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
      },
      status_code: {
        type: Sequelize.STRING(1),
        defaultValue: 'P',
        notEmpty: true
      },
      specified_id: {
        type: Sequelize.STRING,
      }
    });
  
    return Relationship;
  };
  