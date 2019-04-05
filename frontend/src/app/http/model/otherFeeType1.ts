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


/**
 * Other Fee/charge type which is not available in the standard code set
 */
export interface OtherFeeType1 {
    /**
     * The four letter Mnemonic used within an XML file to identify a code
     */
    Code?: string;
    /**
     * Categorisation of fees and charges into standard categories.
     */
    FeeCategory: OtherFeeType1.FeeCategoryEnum;
    /**
     * Long name associated with the code
     */
    Name: string;
    /**
     * Description to describe the purpose of the code
     */
    Description: string;
}
export namespace OtherFeeType1 {
    export type FeeCategoryEnum = 'Other' | 'Servicing';
    export const FeeCategoryEnum = {
        Other: 'Other' as FeeCategoryEnum,
        Servicing: 'Servicing' as FeeCategoryEnum
    }
}
