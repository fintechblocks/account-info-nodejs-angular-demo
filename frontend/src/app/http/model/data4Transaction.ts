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
import { CreditorAgent } from './creditorAgent';
import { Data4Amount } from './data4Amount';
import { Data4Balance } from './data4Balance';
import { Data4BankTransactionCode } from './data4BankTransactionCode';
import { Data4CreditorAccount } from './data4CreditorAccount';
import { Data4MerchantDetails } from './data4MerchantDetails';
import { Data4ProprietaryBankTransactionCode } from './data4ProprietaryBankTransactionCode';
import { DebtorAccount } from './debtorAccount';
import { DebtorAgent } from './debtorAgent';


export interface Data4Transaction {
    /**
     * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
     */
    AccountId: string;
    /**
     * Unique identifier for the transaction within an servicing institution. This identifier is both unique and immutable.
     */
    TransactionId?: string;
    /**
     * Unique reference for the transaction. This reference is optionally populated, and may as an example be the FPID in the Faster Payments context.
     */
    TransactionReference?: string;
    Amount: Data4Amount;
    /**
     * Indicates whether the transaction is a credit or a debit entry.
     */
    CreditDebitIndicator: Data4Transaction.CreditDebitIndicatorEnum;
    /**
     * Status of a transaction entry on the books of the account servicer.
     */
    Status: Data4Transaction.StatusEnum;
    /**
     * Date and time when a transaction entry is posted to an account on the account servicer's books. Usage: Booking date is the expected booking date, unless the status is booked, in which case it is the actual booking date.  All dates in the JSON payloads are represented in ISO 8601 date-time format.  All date-time fields in responses must include the timezone. An example is below: 2017-04-05T10:43:07+00:00
     */
    BookingDateTime: Date;
    /**
     * Date and time at which assets become available to the account owner in case of a credit entry, or cease to be available to the account owner in case of a debit entry.  Usage: If entry status is pending and value date is present, then the value date refers to an expected/requested value date. For entries subject to availability/float and for which availability information is provided, the value date must not be used. In this case the availability component identifies the  number of availability days.  All dates in the JSON payloads are represented in ISO 8601 date-time format.  All date-time fields in responses must include the timezone. An example is below: 2017-04-05T10:43:07+00:00
     */
    ValueDateTime?: Date;
    /**
     * Further details of the transaction. This is the transaction narrative, which is unstructured text.
     */
    TransactionInformation?: string;
    /**
     * Information that locates and identifies a specific address, as defined by postal services, that is presented in free format text.
     */
    AddressLine?: string;
    BankTransactionCode?: Data4BankTransactionCode;
    ProprietaryBankTransactionCode?: Data4ProprietaryBankTransactionCode;
    Balance?: Data4Balance;
    MerchantDetails?: Data4MerchantDetails;
    CreditorAccount?: Data4CreditorAccount;
    CreditorAgent?: CreditorAgent;
    DebtorAccount?: DebtorAccount;
    DebtorAgent?: DebtorAgent;
}
export namespace Data4Transaction {
    export type CreditDebitIndicatorEnum = 'Credit' | 'Debit';
    export const CreditDebitIndicatorEnum = {
        Credit: 'Credit' as CreditDebitIndicatorEnum,
        Debit: 'Debit' as CreditDebitIndicatorEnum
    }
    export type StatusEnum = 'Booked' | 'Pending';
    export const StatusEnum = {
        Booked: 'Booked' as StatusEnum,
        Pending: 'Pending' as StatusEnum
    }
}
