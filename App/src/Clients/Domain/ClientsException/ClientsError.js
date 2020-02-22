class ClientsError
{
    message;
    code;
    constructor(message, code){
        this.message = message;
        this.code = code;
    }
    get message(){
        return this.message;
    };
    get code(){
        return this.code;
    };
    set message(message){
        this.message = message;
    };
    set code(code){
        this.code = code;
    };
}

module.exports = ClientsError;