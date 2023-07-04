const accountsModel = require( "../models/account.model" );
const BaseService = require( "../utils/BaseRepository" );

class AccountService extends BaseService {
    constructor () {
        super( accountsModel );
    }
    async findAccountByEmail( email ) {
        return await this.model.findOne( { email } ).lean();
    }
    async banAccount( accountId ) {
        return await this.model.findOneAndUpdate( { _id: accountId }, {status:"baned"},  { new: true } ).lean();
    }
}

module.exports = new AccountService();
