class BaseService {
  constructor ( model ) {
    this.model = model;
  }
  getAll = async () => {
    return await this.model?.find().lean();
  };
  getById = async ( id, populateOptions ) => {
    let query = this.model?.findById( id ).lean();
    if ( populateOptions ) {
      query = query.populate( populateOptions );
    }
    return await query.exec();
  };
  create = async ( object ) => {
    //check if the object is ref to another model
    switch ( this.model.modelName ) {
      case "Restaurant":
        object.restaurantOwnerId = object.restaurantOwnerId._id;
        break;
      case "Table":
        object.restaurantId = object.restaurantId._id;
        break;
      case "Reservation":
        object.restaurantId = object.restaurantId._id;
        object.tableId = object.tableId._id;
        break;
      default:
        break;
    }
    return await this.model?.create( object );
  };
  update = async ( id, updateObj ) => {
    return await this.model?.findByIdAndUpdate( id, updateObj, {
      upsert: true,
      new: true,
    } );
  };
  delete = async ( id ) => {
    return await this.model?.findByIdAndRemove( id ).lean();
  };
}
module.exports = BaseService;
