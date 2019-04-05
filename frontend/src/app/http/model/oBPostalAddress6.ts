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
import { OBAddressTypeCode } from './oBAddressTypeCode';


/**
 * Information that locates and identifies a specific address, as defined by postal services.
 */
export interface OBPostalAddress6 {
    AddressType?: OBAddressTypeCode;
    /**
     * Identification of a division of a large organisation or building.
     */
    Department?: string;
    /**
     * Identification of a sub-division of a large organisation or building.
     */
    SubDepartment?: string;
    /**
     * Name of a street or thoroughfare.
     */
    StreetName?: string;
    /**
     * Number that identifies the position of a building on a street.
     */
    BuildingNumber?: string;
    /**
     * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
     */
    PostCode?: string;
    /**
     * Name of a built-up area, with defined boundaries, and a local government.
     */
    TownName?: string;
    /**
     * Identifies a subdivision of a country such as state, region, county.
     */
    CountrySubDivision?: string;
    /**
     * Nation with its own government.
     */
    Country?: string;
    /**
     * Information that locates and identifies a specific address, as defined by postal services, presented in free format text.
     */
    AddressLine?: Array<string>;
}