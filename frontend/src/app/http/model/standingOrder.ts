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
import { Data8CreditorAccount } from './data8CreditorAccount';
import { Data8FinalPaymentAmount } from './data8FinalPaymentAmount';
import { Data8FirstPaymentAmount } from './data8FirstPaymentAmount';
import { Data8NextPaymentAmount } from './data8NextPaymentAmount';
import { Data8Servicer } from './data8Servicer';


/**
 * Standing Order
 */
export interface StandingOrder {
    /**
     * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
     */
    AccountId: string;
    /**
     * A unique and immutable identifier used to identify the standing order resource. This identifier has no meaning to the account owner.
     */
    StandingOrderId?: string;
    /**
     * EvryDay - Every day EvryWorkgDay - Every working day IntrvlWkDay - An interval specified in weeks (01 to 09), and the day within the week (01 to 07) WkInMnthDay - A monthly interval, specifying the week of the month (01 to 05) and day within the week (01 to 07) IntrvlMnthDay - An interval specified in months (between 01 to 06, 12, 24), specifying the day within the month (-5 to -1, 1 to 31) QtrDay - Quarterly (either ENGLISH, SCOTTISH, or RECEIVED) Patterns:  EvryDay (ScheduleCode) EvryWorkgDay (ScheduleCode) IntrvlWkDay:IntervalInWeeks:DayInWeek (ScheduleCode + IntervalInWeeks + DayInWeek) WkInMnthDay:WeekInMonth:DayInWeek (ScheduleCode + WeekInMonth + DayInWeek) IntrvlMnthDay:IntervalInMonths:DayInMonth (ScheduleCode + IntervalInMonths + DayInMonth) QtrDay: + either (ENGLISH, SCOTTISH or RECEIVED) ScheduleCode + QuarterDay The regular expression for this element combines five smaller versions for each permitted pattern. To aid legibility - the components are presented individually here: EvryDay EvryWorkgDay IntrvlWkDay:0[1-9]:0[1-7] WkInMnthDay:0[1-5]:0[1-7] IntrvlMnthDay:(0[1-6]|12|24):(-0[1-5]|0[1-9]|[12][0-9]|3[01]) QtrDay:(ENGLISH|SCOTTISH|RECEIVED) 
     */
    Frequency: string;
    /**
     * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
     */
    Reference?: string;
    /**
     * The date on which the first payment for a Standing Order schedule will be made.  All dates in the JSON payloads are represented in ISO 8601 date-time format.  All date-time fields in responses must include the timezone. An example is below: 2017-04-05T10:43:07+00:00
     */
    FirstPaymentDateTime?: Date;
    FirstPaymentAmount?: Data8FirstPaymentAmount;
    /**
     * The date on which the next payment for a Standing Order schedule will be made.  All dates in the JSON payloads are represented in ISO 8601 date-time format.  All date-time fields in responses must include the timezone. An example is below: 2017-04-05T10:43:07+00:00
     */
    NextPaymentDateTime: Date;
    NextPaymentAmount: Data8NextPaymentAmount;
    /**
     * The date on which the final payment for a Standing Order schedule will be made.  All dates in the JSON payloads are represented in ISO 8601 date-time format.  All date-time fields in responses must include the timezone. An example is below: 2017-04-05T10:43:07+00:00
     */
    FinalPaymentDateTime?: Date;
    FinalPaymentAmount?: Data8FinalPaymentAmount;
    Servicer?: Data8Servicer;
    CreditorAccount?: Data8CreditorAccount;
}
