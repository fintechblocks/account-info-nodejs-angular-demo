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
import { OBActiveOrHistoricCurrencyAndAmount } from './oBActiveOrHistoricCurrencyAndAmount';
import { OBExternalScheduleType1Code } from './oBExternalScheduleType1Code';


export interface OBScheduledPayment2Basic {
    AccountId: AccountId;
    /**
     * A unique and immutable identifier used to identify the scheduled payment resource. This identifier has no meaning to the account owner.
     */
    ScheduledPaymentId?: string;
    /**
     * The date on which the scheduled payment will be made. All dates in the JSON payloads are represented in ISO 8601 date-time format.  All date-time fields in responses must include the timezone. An example is below: 2017-04-05T10:43:07+00:00
     */
    ScheduledPaymentDateTime: Date;
    ScheduledType: OBExternalScheduleType1Code;
    /**
     * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
     */
    Reference?: string;
    InstructedAmount: OBActiveOrHistoricCurrencyAndAmount;
}
