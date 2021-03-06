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
import { FeeApplicableRange } from './feeApplicableRange';
import { OBBCAData1FeeChargeCap } from './oBBCAData1FeeChargeCap';
import { OtherApplicationFrequency1 } from './otherApplicationFrequency1';
import { OtherCalculationFrequency1 } from './otherCalculationFrequency1';
import { OtherFeeCategoryType } from './otherFeeCategoryType';
import { OtherFeeRateType1 } from './otherFeeRateType1';
import { OtherFeeType1 } from './otherFeeType1';


/**
 * Other fees/charges details
 */
export interface OBBCAData1FeeChargeDetail {
    /**
     * Categorisation of fees and charges into standard categories.
     */
    FeeCategory: OBBCAData1FeeChargeDetail.FeeCategoryEnum;
    /**
     * Fee/Charge Type
     */
    FeeType: OBBCAData1FeeChargeDetail.FeeTypeEnum;
    /**
     * Fee/charge which is usually negotiable rather than a fixed amount
     */
    NegotiableIndicator?: boolean;
    /**
     * Fee Amount charged for a fee/charge (where it is charged in terms of an amount rather than a rate)
     */
    FeeAmount?: string;
    /**
     * Rate charged for Fee/Charge (where it is charged in terms of a rate rather than an amount)
     */
    FeeRate?: string;
    /**
     * Rate type for Fee/Charge (where it is charged in terms of a rate rather than an amount)
     */
    FeeRateType?: OBBCAData1FeeChargeDetail.FeeRateTypeEnum;
    /**
     * How frequently the fee/charge is applied to the account
     */
    ApplicationFrequency: OBBCAData1FeeChargeDetail.ApplicationFrequencyEnum;
    /**
     * How frequently the fee/charge is calculated
     */
    CalculationFrequency?: OBBCAData1FeeChargeDetail.CalculationFrequencyEnum;
    /**
     * Optional additional notes to supplement the fee/charge details.
     */
    Notes?: Array<string>;
    /**
     * Details about any caps (maximum charges) that apply to a particular or group of fee/charge
     */
    FeeChargeCap?: Array<OBBCAData1FeeChargeCap>;
    OtherFeeCategoryType?: OtherFeeCategoryType;
    OtherFeeType?: OtherFeeType1;
    OtherFeeRateType?: OtherFeeRateType1;
    OtherApplicationFrequency?: OtherApplicationFrequency1;
    OtherCalculationFrequency?: OtherCalculationFrequency1;
    FeeApplicableRange?: FeeApplicableRange;
}
export namespace OBBCAData1FeeChargeDetail {
    export type FeeCategoryEnum = 'Other' | 'Servicing';
    export const FeeCategoryEnum = {
        Other: 'Other' as FeeCategoryEnum,
        Servicing: 'Servicing' as FeeCategoryEnum
    }
    export type FeeTypeEnum = 'Other' | 'ServiceCAccountFee' | 'ServiceCAccountFeeMonthly' | 'ServiceCAccountFeeQuarterly' | 'ServiceCFixedTariff' | 'ServiceCBusiDepAccBreakage' | 'ServiceCMinimumMonthlyFee' | 'ServiceCOther';
    export const FeeTypeEnum = {
        Other: 'Other' as FeeTypeEnum,
        ServiceCAccountFee: 'ServiceCAccountFee' as FeeTypeEnum,
        ServiceCAccountFeeMonthly: 'ServiceCAccountFeeMonthly' as FeeTypeEnum,
        ServiceCAccountFeeQuarterly: 'ServiceCAccountFeeQuarterly' as FeeTypeEnum,
        ServiceCFixedTariff: 'ServiceCFixedTariff' as FeeTypeEnum,
        ServiceCBusiDepAccBreakage: 'ServiceCBusiDepAccBreakage' as FeeTypeEnum,
        ServiceCMinimumMonthlyFee: 'ServiceCMinimumMonthlyFee' as FeeTypeEnum,
        ServiceCOther: 'ServiceCOther' as FeeTypeEnum
    }
    export type FeeRateTypeEnum = 'Gross' | 'Other';
    export const FeeRateTypeEnum = {
        Gross: 'Gross' as FeeRateTypeEnum,
        Other: 'Other' as FeeRateTypeEnum
    }
    export type ApplicationFrequencyEnum = 'OnClosing' | 'OnOpening' | 'ChargingPeriod' | 'Daily' | 'PerItem' | 'Monthly' | 'OnAnniversary' | 'Other' | 'PerHundredPounds' | 'PerHour' | 'PerOccurrence' | 'PerSheet' | 'PerTransaction' | 'PerTransactionAmount' | 'PerTransactionPercentage' | 'Quarterly' | 'SixMonthly' | 'StatementMonthly' | 'Weekly' | 'Yearly';
    export const ApplicationFrequencyEnum = {
        OnClosing: 'OnClosing' as ApplicationFrequencyEnum,
        OnOpening: 'OnOpening' as ApplicationFrequencyEnum,
        ChargingPeriod: 'ChargingPeriod' as ApplicationFrequencyEnum,
        Daily: 'Daily' as ApplicationFrequencyEnum,
        PerItem: 'PerItem' as ApplicationFrequencyEnum,
        Monthly: 'Monthly' as ApplicationFrequencyEnum,
        OnAnniversary: 'OnAnniversary' as ApplicationFrequencyEnum,
        Other: 'Other' as ApplicationFrequencyEnum,
        PerHundredPounds: 'PerHundredPounds' as ApplicationFrequencyEnum,
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
    export type CalculationFrequencyEnum = 'OnClosing' | 'OnOpening' | 'ChargingPeriod' | 'Daily' | 'PerItem' | 'Monthly' | 'OnAnniversary' | 'Other' | 'PerHundredPounds' | 'PerHour' | 'PerOccurrence' | 'PerSheet' | 'PerTransaction' | 'PerTransactionAmount' | 'PerTransactionPercentage' | 'Quarterly' | 'SixMonthly' | 'StatementMonthly' | 'Weekly' | 'Yearly';
    export const CalculationFrequencyEnum = {
        OnClosing: 'OnClosing' as CalculationFrequencyEnum,
        OnOpening: 'OnOpening' as CalculationFrequencyEnum,
        ChargingPeriod: 'ChargingPeriod' as CalculationFrequencyEnum,
        Daily: 'Daily' as CalculationFrequencyEnum,
        PerItem: 'PerItem' as CalculationFrequencyEnum,
        Monthly: 'Monthly' as CalculationFrequencyEnum,
        OnAnniversary: 'OnAnniversary' as CalculationFrequencyEnum,
        Other: 'Other' as CalculationFrequencyEnum,
        PerHundredPounds: 'PerHundredPounds' as CalculationFrequencyEnum,
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
