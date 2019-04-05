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
import { OBExternalStatementBenefitType1Code } from './oBExternalStatementBenefitType1Code';


/**
 * Set of elements used to provide details of a benefit or reward amount for the statement resource.
 */
export interface OBStatementBenefit1 {
    Type: OBExternalStatementBenefitType1Code;
    Amount: OBActiveOrHistoricCurrencyAndAmount;
}
