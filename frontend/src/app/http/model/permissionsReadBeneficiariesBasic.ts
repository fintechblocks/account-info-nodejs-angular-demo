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
 * Ability to read basic beneficiary details
 */
export interface PermissionsReadBeneficiariesBasic {
    /**
     * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
     */
    AccountId?: string;
    /**
     * A unique and immutable identifier used to identify the beneficiary resource. This identifier has no meaning to the account owner.
     */
    BeneficiaryId?: string;
    /**
     * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
     */
    Reference?: string;
}
