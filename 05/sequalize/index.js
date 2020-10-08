const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'u!eL&Ej>M,#5YJR', {
    host: 'localhost',
    dialect: 'mysql'
});

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    email: {
        type: DataTypes.STRING
    }
  }, {
    // Other model options go here
});

  class Foo extends Model {}

    Foo.init({ /* attributes */ }, {
    sequelize,

    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'updateTimestamp'
});

async function sync() {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
}

sync();