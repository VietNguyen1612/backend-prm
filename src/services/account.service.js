const accountsModel = require( "../models/account.model" );
const BaseService = require( "../utils/BaseRepository" );

class AccountService extends BaseService {
    constructor () {
        super( accountsModel );
    }
    async findAccountByEmail( email ) {
        return await this.model.findOne( { email } ).lean();
    }
}

module.exports = new AccountService();
