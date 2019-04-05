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
import { OBExternalStatementAmountType1Code } from './oBExternalStatementAmountType1Code';


/**
 * Set of elements used to provide details of a generic amount for the statement resource.
 */
export interface OBStatementAmount1 {
    /**
     * Indicates whether the amount is a credit or a debit.  Usage: A zero amount is considered to be a credit amount.
     */
    CreditDebitIndicator: OBStatementAmount1.CreditDebitIndicatorEnum;
    Type: OBExternalStatementAmountType1Code;
    Amount: OBActiveOrHistoricCurrencyAndAmount;
}
export namespace OBStatementAmount1 {
    export type CreditDebitIndicatorEnum = 'Credit' | 'Debit';
    export const CreditDebitIndicatorEnum = {
        Credit: 'Credit' as CreditDebitIndicatorEnum,
        Debit: 'Debit' as CreditDebitIndicatorEnum
    }
}
