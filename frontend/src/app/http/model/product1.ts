/**
 * Account and Transaction API Specification
 * Swagger for Account and Transaction API Specification
 *
 * OpenAPI spec version: v1.1.1
 * Contact: ServiceDesk@openbanking.org.uk
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * Product
 */
export interface Product1 {
    /**
     * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
     */
    AccountId: string;
    /**
     * Identifier within the parent organisation for the product. Must be unique in the organisation.
     */
    ProductIdentifier: string;
    /**
     * Descriptive code for the product category.
     */
    ProductType: Product1.ProductTypeEnum;
    /**
     * The name of the product used for marketing purposes from a customer perspective. I.e. what the customer would recognise.
     */
    ProductName?: string;
    /**
     * Identifier within the parent organisation for the product. Must be unique in the organisation.
     */
    SecondaryProductIdentifier?: string;
}
export namespace Product1 {
    export type ProductTypeEnum = 'BCA' | 'PCA';
    export const ProductTypeEnum = {
        BCA: 'BCA' as ProductTypeEnum,
        PCA: 'PCA' as ProductTypeEnum
    }
}
