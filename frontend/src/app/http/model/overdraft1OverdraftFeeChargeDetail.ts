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
import { OtherApplicationFrequency } from './otherApplicationFrequency';
import { OtherCalculationFrequency } from './otherCalculationFrequency';
import { OtherFeeRateType } from './otherFeeRateType';
import { OtherFeeType } from './otherFeeType';
import { Overdraft1OverdraftFeeChargeCap } from './overdraft1OverdraftFeeChargeCap';


/**
 * Details about the fees/charges
 */
export interface Overdraft1OverdraftFeeChargeDetail {
    /**
     * Overdraft fee type
     */
    FeeType: Overdraft1OverdraftFeeChargeDetail.FeeTypeEnum;
    /**
     * Specifies for the overdraft control feature/benefit
     */
    OverdraftControlIndicator?: boolean;
    /**
     * Every additional tranche of an overdraft balance to which an overdraft fee is applied
     */
    IncrementalBorrowingAmount?: string;
    /**
     * Amount charged for an overdraft fee/charge (where it is charged in terms of an amount rather than a rate)
     */
    FeeAmount?: string;
    /**
     * Rate charged for overdraft fee/charge (where it is charged in terms of a rate rather than an amount)
     */
    FeeRate?: string;
    /**
     * Rate type for overdraft fee/charge (where it is charged in terms of a rate rather than an amount)
     */
    FeeRateType?: Overdraft1OverdraftFeeChargeDetail.FeeRateTypeEnum;
    /**
     * Frequency at which the overdraft charge is applied to the account
     */
    ApplicationFrequency: Overdraft1OverdraftFeeChargeDetail.ApplicationFrequencyEnum;
    /**
     * How often is the overdraft fee/charge calculated for the account.
     */
    CalculationFrequency?: Overdraft1OverdraftFeeChargeDetail.CalculationFrequencyEnum;
    /**
     * Free text for capturing any other info related to Overdraft Fees Charge Details
     */
    Notes?: Array<string>;
    OtherFeeType?: OtherFeeType;
    OtherFeeRateType?: OtherFeeRateType;
    OtherApplicationFrequency?: OtherApplicationFrequency;
    OtherCalculationFrequency?: OtherCalculationFrequency;
    OverdraftFeeChargeCap?: Overdraft1OverdraftFeeChargeCap;
}
export namespace Overdraft1OverdraftFeeChargeDetail {
    export type FeeTypeEnum = 'ArrangedOverdraft' | 'EmergencyBorrowing' | 'BorrowingItem' | 'OverdraftRenewal' | 'AnnualReview' | 'OverdraftSetup' | 'Surcharge' | 'TempOverdraft' | 'UnauthorisedBorrowing' | 'UnauthorisedPaidTrans' | 'Other' | 'UnauthorisedUnpaidTrans';
    export const FeeTypeEnum = {
        ArrangedOverdraft: 'ArrangedOverdraft' as FeeTypeEnum,
        EmergencyBorrowing: 'EmergencyBorrowing' as FeeTypeEnum,
        BorrowingItem: 'BorrowingItem' as FeeTypeEnum,
        OverdraftRenewal: 'OverdraftRenewal' as FeeTypeEnum,
        AnnualReview: 'AnnualReview' as FeeTypeEnum,
        OverdraftSetup: 'OverdraftSetup' as FeeTypeEnum,
        Surcharge: 'Surcharge' as FeeTypeEnum,
        TempOverdraft: 'TempOverdraft' as FeeTypeEnum,
        UnauthorisedBorrowing: 'UnauthorisedBorrowing' as FeeTypeEnum,
        UnauthorisedPaidTrans: 'UnauthorisedPaidTrans' as FeeTypeEnum,
        Other: 'Other' as FeeTypeEnum,
        UnauthorisedUnpaidTrans: 'UnauthorisedUnpaidTrans' as FeeTypeEnum
    }
    export type FeeRateTypeEnum = 'LinkedBaseRate' | 'Gross' | 'Net' | 'Other';
    export const FeeRateTypeEnum = {
        LinkedBaseRate: 'LinkedBaseRate' as FeeRateTypeEnum,
        Gross: 'Gross' as FeeRateTypeEnum,
        Net: 'Net' as FeeRateTypeEnum,
        Other: 'Other' as FeeRateTypeEnum
    }
    export type ApplicationFrequencyEnum = 'AccountClosing' | 'AccountOpening' | 'AcademicTerm' | 'ChargingPeriod' | 'Daily' | 'PerItem' | 'Monthly' | 'OnAccountAnniversary' | 'Other' | 'PerHour' | 'PerOccurrence' | 'PerSheet' | 'PerTransaction' | 'PerTransactionAmount' | 'PerTransactionPercentage' | 'Quarterly' | 'SixMonthly' | 'StatementMonthly' | 'Weekly' | 'Yearly';
    export const ApplicationFrequencyEnum = {
        AccountClosing: 'AccountClosing' as ApplicationFrequencyEnum,
        AccountOpening: 'AccountOpening' as ApplicationFrequencyEnum,
        AcademicTerm: 'AcademicTerm' as ApplicationFrequencyEnum,
        ChargingPeriod: 'ChargingPeriod' as ApplicationFrequencyEnum,
        Daily: 'Daily' as ApplicationFrequencyEnum,
        PerItem: 'PerItem' as ApplicationFrequencyEnum,
        Monthly: 'Monthly' as ApplicationFrequencyEnum,
        OnAccountAnniversary: 'OnAccountAnniversary' as ApplicationFrequencyEnum,
        Other: 'Other' as ApplicationFrequencyEnum,
        PerHour: 'PerHour' as ApplicationFrequencyEnum,
        PerOccurrence: 'PerOccurrence' as ApplicationFrequencyEnum,
        PerSheet: 'PerSheet' as ApplicationFrequencyEnum,
        PerTransaction: 'PerTransaction' as ApplicationFrequencyEnum,
        PerTransactionAmount: 'PerTransactionAmount' as ApplicationFrequencyEnum,
        PerTransactionPercentage: 'PerTransactionPercentage' as ApplicationFrequencyEnum,
        Quarterly: 'Quarterly' as ApplicationFrequencyEnum,
        SixMonthly: 'SixMonthly' as ApplicationFrequencyEnum,
        StatementMonthly: 'StatementMonthly' as ApplicationFrequencyEnum,
        Weekly: 'Weekly' as ApplicationFrequencyEnum,
        Yearly: 'Yearly' as ApplicationFrequencyEnum
    }
    export type CalculationFrequencyEnum = 'AccountClosing' | 'AccountOpening' | 'AcademicTerm' | 'ChargingPeriod' | 'Daily' | 'PerItem' | 'Monthly' | 'OnAccountAnniversary' | 'Other' | 'PerHour' | 'PerOccurrence' | 'PerSheet' | 'PerTransaction' | 'PerTransactionAmount' | 'PerTransactionPercentage' | 'Quarterly' | 'SixMonthly' | 'StatementMonthly' | 'Weekly' | 'Yearly';
    export const CalculationFrequencyEnum = {
        AccountClosing: 'AccountClosing' as CalculationFrequencyEnum,
        AccountOpening: 'AccountOpening' as CalculationFrequencyEnum,
        AcademicTerm: 'AcademicTerm' as CalculationFrequencyEnum,
        ChargingPeriod: 'ChargingPeriod' as CalculationFrequencyEnum,
        Daily: 'Daily' as CalculationFrequencyEnum,
        PerItem: 'PerItem' as CalculationFrequencyEnum,
        Monthly: 'Monthly' as CalculationFrequencyEnum,
        OnAccountAnniversary: 'OnAccountAnniversary' as CalculationFrequencyEnum,
        Other: 'Other' as CalculationFrequencyEnum,
        PerHour: 'PerHour' as CalculationFrequencyEnum,
        PerOccurrence: 'PerOccurrence' as CalculationFrequencyEnum,
        PerSheet: 'PerSheet' as CalculationFrequencyEnum,
        PerTransaction: 'PerTransaction' as CalculationFrequencyEnum,
        PerTransactionAmount: 'PerTransactionAmount' as CalculationFrequencyEnum,
        PerTransactionPercentage: 'PerTransactionPercentage' as CalculationFrequencyEnum,
        Quarterly: 'Quarterly' as CalculationFrequencyEnum,
        SixMonthly: 'SixMonthly' as CalculationFrequencyEnum,
        StatementMonthly: 'StatementMonthly' as CalculationFrequencyEnum,
        Weekly: 'Weekly' as CalculationFrequencyEnum,
        Yearly: 'Yearly' as CalculationFrequencyEnum
    }
}
