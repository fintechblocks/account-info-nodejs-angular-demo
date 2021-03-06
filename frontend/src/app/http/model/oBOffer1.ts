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
import { OBExternalOfferType1Code } from './oBExternalOfferType1Code';


export interface OBOffer1 {
    AccountId: AccountId;
    /**
     * A unique and immutable identifier used to identify the offer resource. This identifier has no meaning to the account owner.
     */
    OfferId?: string;
    OfferType?: OBExternalOfferType1Code;
    /**
     * Further details of the offer.
     */
    Description?: string;
    /**
     * Date and time at which the offer starts. All dates in the JSON payloads are represented in ISO 8601 date-time format.  All date-time fields in responses must include the timezone. An example is below: 2017-04-05T10:43:07+00:00
     */
    StartDateTime?: Date;
    /**
     * Date and time at which the offer ends. All dates in the JSON payloads are represented in ISO 8601 date-time format.  All date-time fields in responses must include the timezone. An example is below: 2017-04-05T10:43:07+00:00
     */
    EndDateTime?: Date;
    /**
     * Rate associated with the offer type.
     */
    Rate?: string;
    /**
     * Value associated with the offer type.
     */
    Value?: number;
    /**
     * Further details of the term of the offer.
     */
    Term?: string;
    /**
     * URL (Uniform Resource Locator) where documentation on the offer can be found
     */
    URL?: string;
    Amount?: OBActiveOrHistoricCurrencyAndAmount;
    Fee?: OBActiveOrHistoricCurrencyAndAmount;
}
