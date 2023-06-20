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
