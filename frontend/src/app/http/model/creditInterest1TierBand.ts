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
import { OtherBankInterestType } from './otherBankInterestType';
import { OtherCalculationFrequency } from './otherCalculationFrequency';


/**
 * Tier Band Details
 */
export interface CreditInterest1TierBand {
    /**
     * Unique and unambiguous identification of a  Tier Band for a PCA.
     */
    Identification?: string;
    /**
     * Minimum deposit value for which the credit interest tier applies.
     */
    TierValueMinimum: string;
    /**
     * Maximum deposit value for which the credit interest tier applies.
     */
    TierValueMaximum?: string;
    /**
     * How often is credit interest calculated for the account.
     */
    CalculationFrequency?: CreditInterest1TierBand.CalculationFrequencyEnum;
    /**
     * How often is interest applied to the PCA for this tier/band i.e. how often the financial institution pays accumulated interest to the customer's PCA.
     */
    ApplicationFrequency: CreditInterest1TierBand.ApplicationFrequencyEnum;
    /**
     * Amount on which Interest applied.
     */
    DepositInterestAppliedCoverage?: CreditInterest1TierBand.DepositInterestAppliedCoverageEnum;
    /**
     * Type of interest rate, Fixed or Variable
     */
    FixedVariableInterestRateType: CreditInterest1TierBand.FixedVariableInterestRateTypeEnum;
    /**
     * The annual equivalent rate (AER) is interest that is calculated under the assumption that any interest paid is combined with the original balance and the next interest payment will be based on the slightly higher account balance. Overall, this means that interest can be compounded several times in a year depending on the number of times that interest payments are made.   Read more: Annual Equivalent Rate (AER) http://www.investopedia.com/terms/a/aer.asp#ixzz4gfR7IO1A
     */
    AER: string;
    /**
     * Interest rate types, other than AER, which financial institutions may use to describe the annual interest rate payable to the PCA.
     */
    BankInterestRateType?: CreditInterest1TierBand.BankInterestRateTypeEnum;
    /**
     * Bank Interest for the PCA product
     */
    BankInterestRate?: string;
    /**
     * Optional additional notes to supplement the Tier Band details
     */
    Notes?: Array<string>;
    OtherBankInterestType?: OtherBankInterestType;
    OtherApplicationFrequency?: OtherApplicationFrequency;
    OtherCalculationFrequency?: OtherCalculationFrequency;
}
export namespace CreditInterest1TierBand {
    export type CalculationFrequencyEnum = 'PerAcademicTerm' | 'Daily' | 'HalfYearly' | 'Monthly' | 'Other' | 'Quarterly' | 'PerStatementDate' | 'Weekly' | 'Yearly';
    export const CalculationFrequencyEnum = {
        PerAcademicTerm: 'PerAcademicTerm' as CalculationFrequencyEnum,
        Daily: 'Daily' as CalculationFrequencyEnum,
        HalfYearly: 'HalfYearly' as CalculationFrequencyEnum,
        Monthly: 'Monthly' as CalculationFrequencyEnum,
        Other: 'Other' as CalculationFrequencyEnum,
        Quarterly: 'Quarterly' as CalculationFrequencyEnum,
        PerStatementDate: 'PerStatementDate' as CalculationFrequencyEnum,
        Weekly: 'Weekly' as CalculationFrequencyEnum,
        Yearly: 'Yearly' as CalculationFrequencyEnum
    }
    export type ApplicationFrequencyEnum = 'PerAcademicTerm' | 'Daily' | 'HalfYearly' | 'Monthly' | 'Other' | 'Quarterly' | 'PerStatementDate' | 'Weekly' | 'Yearly';
    export const ApplicationFrequencyEnum = {
        PerAcademicTerm: 'PerAcademicTerm' as ApplicationFrequencyEnum,
        Daily: 'Daily' as ApplicationFrequencyEnum,
        HalfYearly: 'HalfYearly' as ApplicationFrequencyEnum,
        Monthly: 'Monthly' as ApplicationFrequencyEnum,
        Other: 'Other' as ApplicationFrequencyEnum,
        Quarterly: 'Quarterly' as ApplicationFrequencyEnum,
        PerStatementDate: 'PerStatementDate' as ApplicationFrequencyEnum,
        Weekly: 'Weekly' as ApplicationFrequencyEnum,
        Yearly: 'Yearly' as ApplicationFrequencyEnum
    }
    export type DepositInterestAppliedCoverageEnum = 'Tiered' | 'Whole';
    export const DepositInterestAppliedCoverageEnum = {
        Tiered: 'Tiered' as DepositInterestAppliedCoverageEnum,
        Whole: 'Whole' as DepositInterestAppliedCoverageEnum
    }
    export type FixedVariableInterestRateTypeEnum = 'Fixed' | 'Variable';
    export const FixedVariableInterestRateTypeEnum = {
        Fixed: 'Fixed' as FixedVariableInterestRateTypeEnum,
        Variable: 'Variable' as FixedVariableInterestRateTypeEnum
    }
    export type BankInterestRateTypeEnum = 'LinkedBaseRate' | 'Gross' | 'Net' | 'Other';
    export const BankInterestRateTypeEnum = {
        LinkedBaseRate: 'LinkedBaseRate' as BankInterestRateTypeEnum,
        Gross: 'Gross' as BankInterestRateTypeEnum,
        Net: 'Net' as BankInterestRateTypeEnum,
        Other: 'Other' as BankInterestRateTypeEnum
    }
}
