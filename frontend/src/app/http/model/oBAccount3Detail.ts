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
import { AccountId } from './accountId';
import { OBBranchAndFinancialInstitutionIdentification5 } from './oBBranchAndFinancialInstitutionIdentification5';
import { OBCashAccount5 } from './oBCashAccount5';
import { OBExternalAccountSubType1Code } from './oBExternalAccountSubType1Code';
import { OBExternalAccountType1Code } from './oBExternalAccountType1Code';


/**
 * Unambiguous identification of the account to which credit and debit entries are made.
 */
export interface OBAccount3Detail {
    AccountId: AccountId;
    /**
     * Identification of the currency in which the account is held.  Usage: Currency should only be used in case one and the same account number covers several currencies and the initiating party needs to identify which currency needs to be used for settlement on the account.
     */
    Currency: string;
    AccountType: OBExternalAccountType1Code;
    AccountSubType: OBExternalAccountSubType1Code;
    /**
     * Specifies the description of the account type.
     */
    Description?: string;
    /**
     * The nickname of the account, assigned by the account owner in order to provide an additional means of identification of the account.
     */
    Nickname?: string;
    /**
     * Provides the details to identify an account.
     */
    Account: Array<OBCashAccount5>;
    Servicer?: OBBranchAndFinancialInstitutionIdentification5;
}
