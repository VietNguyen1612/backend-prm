"use strict";

const mongoose = require("mongoose");
const {
  db: { host, name, port },
} = require("../configs/config.mongodb");
const connectionString = `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }
  //   default set la mongodb
  connect(type = "mongodb") {
    mongoose
      .connect(connectionString, {
        maxPoolSize: 50,
      })
      .then(() => {
        console.log(`${connectionString}, connected`);
      })
      .catch((error) => console.log(error));
  }

  static getDBInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const intanceMongoDB = Database.getDBInstance();

module.exports = intanceMongoDB;
