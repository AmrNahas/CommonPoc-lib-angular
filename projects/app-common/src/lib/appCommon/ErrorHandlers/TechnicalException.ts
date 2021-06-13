export class TechnicalException extends Error {

    httpStatus?: number = 404;
    applicationStatus?: number;
    errorMessageTranslationkey: string;
    handled: boolean = false;


    // throw new TechnicalException('can not load on init ', '12545' ,"editSysUserComponent" );
    constructor(message: string  ,excpetionKey:string , controllerName?: string ,  serviceName?: string  ) {
        super("Technical Exception with number  : " + excpetionKey + ' >>>>>>>'+ message + " in " + controllerName? controllerName : ''+ serviceName? serviceName : '' );
        this.name = TechnicalException.name;
        Object.setPrototypeOf(this, TechnicalException.prototype);
    }
}
