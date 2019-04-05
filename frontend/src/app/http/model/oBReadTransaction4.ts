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
import { Links } from './links';
import { Meta } from './meta';
import { OBReadTransaction4Data } from './oBReadTransaction4Data';


export interface OBReadTransaction4 {
    Data: OBReadTransaction4Data;
    Links: Links;
    Meta: Meta;
}
