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
import { OBBalanceType1Code } from './oBBalanceType1Code';


/**
 * Set of elements used to define the balance as a numerical representation of the net increases and decreases in an account after a transaction entry is applied to the account.
 */
export interface OBTransactionCashBalance {
    /**
     * Indicates whether the balance is a credit or a debit balance.  Usage: A zero balance is considered to be a credit balance.
     */
    CreditDebitIndicator: OBTransactionCashBalance.CreditDebitIndicatorEnum;
    Type: OBBalanceType1Code;
    Amount: OBActiveOrHistoricCurrencyAndAmount;
}
export namespace OBTransactionCashBalance {
    export type CreditDebitIndicatorEnum = 'Credit' | 'Debit';
    export const CreditDebitIndicatorEnum = {
        Credit: 'Credit' as CreditDebitIndicatorEnum,
        Debit: 'Debit' as CreditDebitIndicatorEnum
    }
}
