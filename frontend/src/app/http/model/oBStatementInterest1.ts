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
import { OBActiveOrHistoricCurrencyAndAmount } from './oBActiveOrHistoricCurrencyAndAmount';
import { OBExternalStatementInterestType1Code } from './oBExternalStatementInterestType1Code';


/**
 * Set of elements used to provide details of a generic interest amount related to the statement resource.
 */
export interface OBStatementInterest1 {
    /**
     * Indicates whether the amount is a credit or a debit.  Usage: A zero amount is considered to be a credit amount.
     */
    CreditDebitIndicator: OBStatementInterest1.CreditDebitIndicatorEnum;
    Type: OBExternalStatementInterestType1Code;
    Amount: OBActiveOrHistoricCurrencyAndAmount;
}
export namespace OBStatementInterest1 {
    export type CreditDebitIndicatorEnum = 'Credit' | 'Debit';
    export const CreditDebitIndicatorEnum = {
        Credit: 'Credit' as CreditDebitIndicatorEnum,
        Debit: 'Debit' as CreditDebitIndicatorEnum
    }
}
