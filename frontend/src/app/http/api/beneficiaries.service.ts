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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { BeneficiariesGETResponse } from '../model/beneficiariesGETResponse';
import { ErrorResponse } from '../model/errorResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';

import { environment } from './../../../environments/environment';

@Injectable()
export class BeneficiariesService {

    protected basePath = `${environment.apiUrl}/account-info-1.0/open-banking/v1.1`;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Get Account Beneficiaries
     * Get Beneficiaries related to an account
     * @param AccountId A unique identifier used to identify the account resource.
     * @param Authorization An Authorisation Token as per https://tools.ietf.org/html/rfc6750
     * @param x_fapi_financial_id The unique id of the ASPSP to which the request is issued. The unique id will be issued by OB.
     * @param x_fapi_customer_last_logged_time The time when the PSU last logged in with the TPP.  All dates in the HTTP headers are represented as RFC 7231 Full Dates. An example is below:  Sun, 10 Sep 2017 19:43:31 UTC
     * @param x_fapi_customer_ip_address The PSU&#39;s IP address if the PSU is currently logged in with the TPP.
     * @param x_fapi_interaction_id An RFC4122 UID used as a correlation id.
     * @param pg_size 
     * @param pg 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAccountBeneficiaries(AccountId: string, Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, pg_size?: number, pg?: number, observe?: 'body', reportProgress?: boolean): Observable<BeneficiariesGETResponse>;
    public getAccountBeneficiaries(AccountId: string, Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, pg_size?: number, pg?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BeneficiariesGETResponse>>;
    public getAccountBeneficiaries(AccountId: string, Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, pg_size?: number, pg?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BeneficiariesGETResponse>>;
    public getAccountBeneficiaries(AccountId: string, Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, pg_size?: number, pg?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (AccountId === null || AccountId === undefined) {
            throw new Error('Required parameter AccountId was null or undefined when calling getAccountBeneficiaries.');
        }
        if (Authorization === null || Authorization === undefined) {
            throw new Error('Required parameter Authorization was null or undefined when calling getAccountBeneficiaries.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pg_size !== undefined) {
            queryParameters = queryParameters.set('pg_size', <any>pg_size);
        }
        if (pg !== undefined) {
            queryParameters = queryParameters.set('pg', <any>pg);
        }

        let headers = this.defaultHeaders;
        if (x_fapi_financial_id !== undefined && x_fapi_financial_id !== null) {
            headers = headers.set('x-fapi-financial-id', String(x_fapi_financial_id));
        }
        if (x_fapi_customer_last_logged_time !== undefined && x_fapi_customer_last_logged_time !== null) {
            headers = headers.set('x-fapi-customer-last-logged-time', String(x_fapi_customer_last_logged_time));
        }
        if (x_fapi_customer_ip_address !== undefined && x_fapi_customer_ip_address !== null) {
            headers = headers.set('x-fapi-customer-ip-address', String(x_fapi_customer_ip_address));
        }
        if (x_fapi_interaction_id !== undefined && x_fapi_interaction_id !== null) {
            headers = headers.set('x-fapi-interaction-id', String(x_fapi_interaction_id));
        }
        if (Authorization !== undefined && Authorization !== null) {
            headers = headers.set('Authorization', String(Authorization));
        }

        // authentication (PSUOAuth2Security) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json; charset=utf-8'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<BeneficiariesGETResponse>(`${this.basePath}/accounts/${encodeURIComponent(String(AccountId))}/beneficiaries`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Beneficiaries
     * Get Beneficiaries
     * @param Authorization An Authorisation Token as per https://tools.ietf.org/html/rfc6750
     * @param x_fapi_financial_id The unique id of the ASPSP to which the request is issued. The unique id will be issued by OB.
     * @param x_fapi_customer_last_logged_time The time when the PSU last logged in with the TPP.  All dates in the HTTP headers are represented as RFC 7231 Full Dates. An example is below:  Sun, 10 Sep 2017 19:43:31 UTC
     * @param x_fapi_customer_ip_address The PSU&#39;s IP address if the PSU is currently logged in with the TPP.
     * @param x_fapi_interaction_id An RFC4122 UID used as a correlation id.
     * @param pg_size 
     * @param pg 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBeneficiaries(Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, pg_size?: number, pg?: number, observe?: 'body', reportProgress?: boolean): Observable<BeneficiariesGETResponse>;
    public getBeneficiaries(Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, pg_size?: number, pg?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BeneficiariesGETResponse>>;
    public getBeneficiaries(Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, pg_size?: number, pg?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BeneficiariesGETResponse>>;
    public getBeneficiaries(Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, pg_size?: number, pg?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (Authorization === null || Authorization === undefined) {
            throw new Error('Required parameter Authorization was null or undefined when calling getBeneficiaries.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pg_size !== undefined) {
            queryParameters = queryParameters.set('pg_size', <any>pg_size);
        }
        if (pg !== undefined) {
            queryParameters = queryParameters.set('pg', <any>pg);
        }

        let headers = this.defaultHeaders;
        if (x_fapi_financial_id !== undefined && x_fapi_financial_id !== null) {
            headers = headers.set('x-fapi-financial-id', String(x_fapi_financial_id));
        }
        if (x_fapi_customer_last_logged_time !== undefined && x_fapi_customer_last_logged_time !== null) {
            headers = headers.set('x-fapi-customer-last-logged-time', String(x_fapi_customer_last_logged_time));
        }
        if (x_fapi_customer_ip_address !== undefined && x_fapi_customer_ip_address !== null) {
            headers = headers.set('x-fapi-customer-ip-address', String(x_fapi_customer_ip_address));
        }
        if (x_fapi_interaction_id !== undefined && x_fapi_interaction_id !== null) {
            headers = headers.set('x-fapi-interaction-id', String(x_fapi_interaction_id));
        }
        if (Authorization !== undefined && Authorization !== null) {
            headers = headers.set('Authorization', String(Authorization));
        }

        // authentication (PSUOAuth2Security) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json; charset=utf-8'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<BeneficiariesGETResponse>(`${this.basePath}/beneficiaries`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
