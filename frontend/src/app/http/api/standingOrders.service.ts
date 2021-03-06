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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';;

import { OBErrorResponse1 } from '../model/oBErrorResponse1';
import { OBReadStandingOrder4 } from '../model/oBReadStandingOrder4';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';

import { environment } from './../../../environments/environment';

@Injectable()
export class StandingOrdersService {

    protected basePath = `${environment.apiUrl}/open-banking/v3.1/aisp`;
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
     * Get Account Standing Orders
     * 
     * @param AccountId AccountId
     * @param Authorization An Authorisation Token as per https://tools.ietf.org/html/rfc6750
     * @param x_fapi_financial_id The unique id of the ASPSP to which the request is issued. The unique id will be issued by OB.
     * @param x_fapi_customer_last_logged_time The time when the PSU last logged in with the TPP.  All dates in the HTTP headers are represented as RFC 7231 Full Dates. An example is below:  Sun, 10 Sep 2017 19:43:31 UTC
     * @param x_fapi_customer_ip_address The PSU&#39;s IP address if the PSU is currently logged in with the TPP.
     * @param x_fapi_interaction_id An RFC4122 UID used as a correlation id.
     * @param x_customer_user_agent Indicates the user-agent that the PSU is using.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAccountsAccountIdStandingOrders(AccountId: string, Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, x_customer_user_agent?: string, observe?: 'body', reportProgress?: boolean): Observable<OBReadStandingOrder4>;
    public getAccountsAccountIdStandingOrders(AccountId: string, Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, x_customer_user_agent?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OBReadStandingOrder4>>;
    public getAccountsAccountIdStandingOrders(AccountId: string, Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, x_customer_user_agent?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OBReadStandingOrder4>>;
    public getAccountsAccountIdStandingOrders(AccountId: string, Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, x_customer_user_agent?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (AccountId === null || AccountId === undefined) {
            throw new Error('Required parameter AccountId was null or undefined when calling getAccountsAccountIdStandingOrders.');
        }
        if (Authorization === null || Authorization === undefined) {
            throw new Error('Required parameter Authorization was null or undefined when calling getAccountsAccountIdStandingOrders.');
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
        if (x_customer_user_agent !== undefined && x_customer_user_agent !== null) {
            headers = headers.set('x-customer-user-agent', String(x_customer_user_agent));
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
            'application/json; charset=utf-8'
        ];

        return this.httpClient.get<OBReadStandingOrder4>(`${this.basePath}/accounts/${encodeURIComponent(String(AccountId))}/standing-orders`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Standing Orders
     * 
     * @param Authorization An Authorisation Token as per https://tools.ietf.org/html/rfc6750
     * @param x_fapi_financial_id The unique id of the ASPSP to which the request is issued. The unique id will be issued by OB.
     * @param x_fapi_customer_last_logged_time The time when the PSU last logged in with the TPP.  All dates in the HTTP headers are represented as RFC 7231 Full Dates. An example is below:  Sun, 10 Sep 2017 19:43:31 UTC
     * @param x_fapi_customer_ip_address The PSU&#39;s IP address if the PSU is currently logged in with the TPP.
     * @param x_fapi_interaction_id An RFC4122 UID used as a correlation id.
     * @param x_customer_user_agent Indicates the user-agent that the PSU is using.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getStandingOrders(Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, x_customer_user_agent?: string, observe?: 'body', reportProgress?: boolean): Observable<OBReadStandingOrder4>;
    public getStandingOrders(Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, x_customer_user_agent?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OBReadStandingOrder4>>;
    public getStandingOrders(Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, x_customer_user_agent?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OBReadStandingOrder4>>;
    public getStandingOrders(Authorization: string, x_fapi_financial_id?: string, x_fapi_customer_last_logged_time?: string, x_fapi_customer_ip_address?: string, x_fapi_interaction_id?: string, x_customer_user_agent?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (Authorization === null || Authorization === undefined) {
            throw new Error('Required parameter Authorization was null or undefined when calling getStandingOrders.');
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
        if (x_customer_user_agent !== undefined && x_customer_user_agent !== null) {
            headers = headers.set('x-customer-user-agent', String(x_customer_user_agent));
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
            'application/json; charset=utf-8'
        ];

        return this.httpClient.get<OBReadStandingOrder4>(`${this.basePath}/standing-orders`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
