/**
 * Cookbook
 *
 * Contact: github@hulsbus.be
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext 
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

// @ts-ignore
import { CuisineType } from '../model/cuisineType';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class CuisinetypeService {

    protected basePath = 'https://api-staging.gourmedy.com/api/v2';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string|string[], @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            const firstBasePath = Array.isArray(basePath) ? basePath[0] : undefined;
            if (firstBasePath != undefined) {
                basePath = firstBasePath;
            }

            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    // @ts-ignore
    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, (value as Date).toISOString().substring(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Delete a Cuisinetype
     * Delete a cuisinetype
     * @param cuisineTypeID UUID of a cuisine type
     * @param body No body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteCuisinetype(cuisineTypeID: string, body?: object, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<any>;
    public deleteCuisinetype(cuisineTypeID: string, body?: object, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<any>>;
    public deleteCuisinetype(cuisineTypeID: string, body?: object, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<any>>;
    public deleteCuisinetype(cuisineTypeID: string, body?: object, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (cuisineTypeID === null || cuisineTypeID === undefined) {
            throw new Error('Required parameter cuisineTypeID was null or undefined when calling deleteCuisinetype.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (apiKey_1) required
        localVarCredential = this.configuration.lookupCredential('apiKey_1');
        if (localVarCredential) {
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'text/plain'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        let localVarTransferCache: boolean | undefined = options && options.transferCache;
        if (localVarTransferCache === undefined) {
            localVarTransferCache = true;
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'text/plain'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/metadata/cuisinetype/${this.configuration.encodeParam({name: "cuisineTypeID", value: cuisineTypeID, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid"})}`;
        return this.httpClient.request<any>('delete', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: body,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                // transferCache: localVarTransferCache,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all cuisinetypes
     * Get all cuisinetypes known to the API. Currently, this endpoint does not support pagination. This will be added in the future
     * @param body No body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllCuisinetype(body?: object, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<Array<CuisineType>>;
    public getAllCuisinetype(body?: object, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<Array<CuisineType>>>;
    public getAllCuisinetype(body?: object, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<Array<CuisineType>>>;
    public getAllCuisinetype(body?: object, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<any> {

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (apiKey_1) required
        localVarCredential = this.configuration.lookupCredential('apiKey_1');
        if (localVarCredential) {
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'text/plain'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        let localVarTransferCache: boolean | undefined = options && options.transferCache;
        if (localVarTransferCache === undefined) {
            localVarTransferCache = true;
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'text/plain'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/metadata/cuisinetype`;
        return this.httpClient.request<Array<CuisineType>>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: body,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                // transferCache: localVarTransferCache,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get cuisinetype
     * Get a single cuisinetype definition
     * @param cuisineTypeID UUID of a cuisine type
     * @param body No body.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCuisinetype(cuisineTypeID: string, body?: object, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<CuisineType>;
    public getCuisinetype(cuisineTypeID: string, body?: object, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<CuisineType>>;
    public getCuisinetype(cuisineTypeID: string, body?: object, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<CuisineType>>;
    public getCuisinetype(cuisineTypeID: string, body?: object, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (cuisineTypeID === null || cuisineTypeID === undefined) {
            throw new Error('Required parameter cuisineTypeID was null or undefined when calling getCuisinetype.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (apiKey_1) required
        localVarCredential = this.configuration.lookupCredential('apiKey_1');
        if (localVarCredential) {
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'text/plain'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        let localVarTransferCache: boolean | undefined = options && options.transferCache;
        if (localVarTransferCache === undefined) {
            localVarTransferCache = true;
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'text/plain'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/metadata/cuisinetype/${this.configuration.encodeParam({name: "cuisineTypeID", value: cuisineTypeID, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid"})}`;
        return this.httpClient.request<CuisineType>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: body,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                // transferCache: localVarTransferCache,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update cuisinetype
     * Update a cuisinetype definition
     * @param cuisineTypeID UUID of a cuisine type
     * @param cuisineType Updates a cuisinetype. ID field must be omitted. If presented, field will be ignored
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateCuisinetype(cuisineTypeID: string, cuisineType?: CuisineType, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<CuisineType>;
    public updateCuisinetype(cuisineTypeID: string, cuisineType?: CuisineType, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<CuisineType>>;
    public updateCuisinetype(cuisineTypeID: string, cuisineType?: CuisineType, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<CuisineType>>;
    public updateCuisinetype(cuisineTypeID: string, cuisineType?: CuisineType, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (cuisineTypeID === null || cuisineTypeID === undefined) {
            throw new Error('Required parameter cuisineTypeID was null or undefined when calling updateCuisinetype.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (apiKey_1) required
        localVarCredential = this.configuration.lookupCredential('apiKey_1');
        if (localVarCredential) {
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'text/plain'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        let localVarTransferCache: boolean | undefined = options && options.transferCache;
        if (localVarTransferCache === undefined) {
            localVarTransferCache = true;
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/metadata/cuisinetype/${this.configuration.encodeParam({name: "cuisineTypeID", value: cuisineTypeID, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid"})}`;
        return this.httpClient.request<CuisineType>('put', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: cuisineType,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                // transferCache: localVarTransferCache,
                reportProgress: reportProgress
            }
        );
    }

}
