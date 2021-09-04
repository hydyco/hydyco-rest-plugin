/**
 * Extending Express Class
 */
import { Router, Request, Response, NextFunction } from "express";
declare type HydycoRequest = Request & {
    methodCall?: string;
    mquery?: any;
};
export interface HydycoModel {
    find: Function;
    create: Function;
    findById: Function;
    findByIdAndUpdate: Function;
    findByIdAndDelete: Function;
    remove: Function;
    raw: Function;
    getModel: Function;
}
/**
 * Function - Make Mongoose Data query using mquery parsed object
 * @param {Object} query - mquery parsed req object
 * @param {Object} Model - Mongoose Model
 * @return {Promise}
 */
export declare const HydycoQuery: (query: any, Model: HydycoModel) => any;
/**
 * Class - HydycoRoutes - Auto Generate express routes for mongoose model
 * @param {string} modelName - Name of the Model
 * @param {Array[string]} helperModels - Helpers Model list
 */
export default class HydycoRoutes {
    private _model;
    private _router;
    private _defaultPath;
    private _helperModels;
    private _middleware;
    constructor(modelName: string, Model: any, helperModels?: Array<string>);
    /**
     * Get all registered express routes
     * @return {Router} - Express Router Object
     */
    Routes(): Router;
    /**
     * Set Allowed methods
     * @return {IAllowedMethods} allowedMethods
     */
    private allowedMethods;
    /**
     * Get all route paths for the model
     * @return {IRestApiPaths} restApiPaths
     */
    private curdPaths;
    /**
     * Custom Routes
     * @param {Router} - Express Router object
     * @param {string} - default path string
     * @param {Model} - mongoose model
     */
    customRoutes(router: Router, defaultPath: string, model: HydycoModel, helperModels: Array<HydycoModel>): Router;
    /**
     * Add routes methods
     * @param {IMiddleware} method - Name of the method
     * @param {Function}  middleware - Express Middleware
     */
    addMiddleware(method: string, middleware: any): void;
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     * @param {model} - Current Mongoose Model
     */
    list(request: HydycoRequest, response: Response, model: HydycoModel, helperModels: Array<HydycoModel>): Promise<any>;
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     */
    create(request: HydycoRequest, response: Response, model: HydycoModel, helperModels: Array<HydycoModel>): Promise<any>;
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     */
    read(request: HydycoRequest, response: Response, model: HydycoModel, helperModels: Array<HydycoModel>): Promise<any>;
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     *
     */
    update(request: HydycoRequest, response: Response, model: HydycoModel, helperModels: Array<HydycoModel>): Promise<any>;
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     */
    delete(request: HydycoRequest, response: Response, model: HydycoModel, helperModels: Array<HydycoModel>): Promise<any>;
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     */
    deleteAll(request: HydycoRequest, response: Response, model: HydycoModel, helperModels: Array<HydycoModel>): Promise<any>;
    /**
     * Gets called before every api call
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     * @return {HydycoRequest,Response} - Return HydycoRequest and Response
     */
    before(request: HydycoRequest, response: Response, next: NextFunction, model: HydycoModel, helperModels: Array<HydycoModel>): void;
    /**
     * Method Call Middleware
     */
    private methodCallMiddleware;
    /**
     * Gets called after every api call
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     */
    after(res: any, request: HydycoRequest, response: Response): Response<any, Record<string, any>>;
    private _boot;
    /**
     * Apply Middleware to methods
     */
    private _applyMiddleware;
}
export {};
