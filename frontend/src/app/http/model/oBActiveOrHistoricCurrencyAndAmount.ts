/**
 * Account and Transaction API Specification
 * Swagger for Account and Transaction API Specification
 *
 * OpenAPI spec version: v3.1.0
 * Contact: ServiceDesk@openbanking.org.uk
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { OBActiveCurrencyAndAmountSimpleType } from './oBActiveCurrencyAndAmountSimpleType';


/**
 * Amount of money of the cash balance after a transaction entry is applied to the account..
 */
export interface OBActiveOrHistoricCurrencyAndAmount {
    Amount: OBActiveCurrencyAndAmountSimpleType;
    /**
     * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 \"Codes for the representation of currencies and funds\".
     */
    Currency: string;
}
