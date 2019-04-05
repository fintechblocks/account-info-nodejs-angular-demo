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
import { OBBCAData1 } from './oBBCAData1';
import { OBExternalProductType1Code } from './oBExternalProductType1Code';
import { OBOtherProductType1 } from './oBOtherProductType1';
import { OBPCAData1 } from './oBPCAData1';


export interface OBProduct2 {
    /**
     * The name of the product used for marketing purposes from a customer perspective. I.e. what the customer would recognise.
     */
    ProductName?: string;
    /**
     * Identifier within the parent organisation for the product. Must be unique in the organisation.
     */
    ProductId?: string;
    AccountId: AccountId;
    /**
     * Identifier within the parent organisation for the product. Must be unique in the organisation.
     */
    SecondaryProductId?: string;
    ProductType?: OBExternalProductType1Code;
    /**
     * Unique and unambiguous identification of a Product Marketing State.
     */
    MarketingStateId?: string;
    OtherProductType?: OBOtherProductType1;
    BCA?: OBBCAData1;
    PCA?: OBPCAData1;
}