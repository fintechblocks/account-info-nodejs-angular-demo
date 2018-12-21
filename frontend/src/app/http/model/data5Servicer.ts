/**
 * Account and Transaction API Specification
 * Swagger for Account and Transaction API Specification
 *
 * OpenAPI spec version: v1.1.1
 * Contact: ServiceDesk@openbanking.org.uk
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account. This is the servicer of the beneficiary account.
 */
export interface Data5Servicer {
    /**
     * Name of the identification scheme, in a coded form as published in an external list.
     */
    SchemeName: Data5Servicer.SchemeNameEnum;
    /**
     * Unique and unambiguous identification of the servicing institution.
     */
    Identification: string;
}
export namespace Data5Servicer {
    export type SchemeNameEnum = 'BICFI';
    export const SchemeNameEnum = {
        BICFI: 'BICFI' as SchemeNameEnum
    }
}