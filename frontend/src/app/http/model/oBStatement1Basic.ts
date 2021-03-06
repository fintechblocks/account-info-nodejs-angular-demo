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
import { OBExternalStatementType1Code } from './oBExternalStatementType1Code';
import { OBStatementBenefit1 } from './oBStatementBenefit1';
import { OBStatementDateTime1 } from './oBStatementDateTime1';
import { OBStatementFee1 } from './oBStatementFee1';
import { OBStatementInterest1 } from './oBStatementInterest1';
import { OBStatementRate1 } from './oBStatementRate1';
import { OBStatementValue1 } from './oBStatementValue1';


/**
 * Provides further details on a statement resource.
 */
export interface OBStatement1Basic {
    AccountId: AccountId;
    /**
     * Unique identifier for the statement resource within an servicing institution. This identifier is both unique and immutable.
     */
    StatementId?: string;
    /**
     * Unique reference for the statement. This reference may be optionally populated if available.
     */
    StatementReference?: string;
    Type: OBExternalStatementType1Code;
    /**
     * Date and time at which the statement period starts. All dates in the JSON payloads are represented in ISO 8601 date-time format.  All date-time fields in responses must include the timezone. An example is below: 2017-04-05T10:43:07+00:00
     */
    StartDateTime: Date;
    /**
     * Date and time at which the statement period ends. All dates in the JSON payloads are represented in ISO 8601 date-time format.  All date-time fields in responses must include the timezone. An example is below: 2017-04-05T10:43:07+00:00
     */
    EndDateTime: Date;
    /**
     * Date and time at which the resource was created. All dates in the JSON payloads are represented in ISO 8601 date-time format.  All date-time fields in responses must include the timezone. An example is below: 2017-04-05T10:43:07+00:00
     */
    CreationDateTime: Date;
    /**
     * Other descriptions that may be available for the statement resource.
     */
    StatementDescription?: Array<string>;
    /**
     * Set of elements used to provide details of a benefit or reward amount for the statement resource.
     */
    StatementBenefit?: Array<OBStatementBenefit1>;
    /**
     * Set of elements used to provide details of a fee for the statement resource.
     */
    StatementFee?: Array<OBStatementFee1>;
    /**
     * Set of elements used to provide details of a generic interest amount related to the statement resource.
     */
    StatementInterest?: Array<OBStatementInterest1>;
    /**
     * Set of elements used to provide details of a generic date time for the statement resource.
     */
    StatementDateTime?: Array<OBStatementDateTime1>;
    /**
     * Set of elements used to provide details of a generic rate related to the statement resource.
     */
    StatementRate?: Array<OBStatementRate1>;
    /**
     * Set of elements used to provide details of a generic number value related to the statement resource.
     */
    StatementValue?: Array<OBStatementValue1>;
}
