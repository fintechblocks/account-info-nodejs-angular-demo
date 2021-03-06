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
import { OBExternalStatementRateType1Code } from './oBExternalStatementRateType1Code';


/**
 * Set of elements used to provide details of a generic rate related to the statement resource.
 */
export interface OBStatementRate1 {
    /**
     * Rate associated with the statement rate type.
     */
    Rate: string;
    Type: OBExternalStatementRateType1Code;
}
