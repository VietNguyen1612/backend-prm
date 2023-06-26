"use strict";

const mongoose = require( "mongoose" );
// const {
//   db: { host, name, port, Product },
// } = require( "../configs/config.mongodb" );
const Product = require( "../configs/config.mongodb" ).db.Product;
// const connectionString = `mongodb://${ host }:${ port }/${ name }`;
const ProductConnectionString = Product;

class Database {
  constructor () {
    this.connect();
  }
  //   default set la mongodb
  connect( type = "mongodb" ) {
    mongoose
      .connect( ProductConnectionString, {
        maxPoolSize: 50,
      } )
      .then( () => {
        console.log( `${ ProductConnectionString }, connected` );
      } )
      .catch( ( error ) => console.log( error ) );
  }

  static getDBInstance() {
    if ( !Database.instance ) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const intanceMongoDB = Database.getDBInstance();

module.exports = intanceMongoDB;
