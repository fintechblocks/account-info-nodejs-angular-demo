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
import { OBExternalStatementValueType1Code } from './oBExternalStatementValueType1Code';


/**
 * Set of elements used to provide details of a generic number value related to the statement resource.
 */
export interface OBStatementValue1 {
    /**
     * Value associated with the statement value type.
     */
    Value: number;
    Type: OBExternalStatementValueType1Code;
}
