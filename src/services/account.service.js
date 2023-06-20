const accountsModel = require( "../models/account.model" );
const BaseService = require( "../utils/BaseRepository" );

class AccountService extends BaseService {
    constructor () {
        super( accountsModel );
    }

    async findAccountByUsername( username ) {
        return await this.model.findOne( { username } ).lean();
    }
}

module.exports = new AccountService();
