var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydycoQuery = void 0;
/**
 * Extending Express Class
 */
var express_1 = require("express");
var auth_1 = require("@hydyco/auth");
var mquery = require("express-mquery"); // ts-types not found
/**
 * Function - Make Mongoose Data query using mquery parsed object
 * @param {Object} query - mquery parsed req object
 * @param {Object} Model - Mongoose Model
 * @return {Promise}
 */
var HydycoQuery = function (query, Model) {
    if (query) {
        query = {
            filter: query.filter || {},
            paginate: query.paginate || { limit: 10, skip: 0, page: 1 },
            select: query.select || {},
            sort: query.sort || {},
        };
        return Model.find(query.filter)
            .select(query.select)
            .sort(query.sort)
            .limit(query.paginate.limit)
            .skip((query.paginate.page - 1) * query.paginate.limit);
    }
    else {
        return Model.find({});
    }
};
exports.HydycoQuery = HydycoQuery;
/**
 * Class - HydycoRoutes - Auto Generate express routes for mongoose model
 * @param {string} modelName - Name of the Model
 * @param {Array[string]} helperModels - Helpers Model list
 */
var HydycoRoutes = /** @class */ (function () {
    function HydycoRoutes(modelName, Model, helperModels) {
        if (helperModels === void 0) { helperModels = []; }
        this._router = (0, express_1.Router)();
        this._middleware = {
            list: [],
            create: [],
            read: [],
            update: [],
            delete: [],
            deleteAll: [],
        };
        this._model = new Model(modelName);
        this._defaultPath = "/" + modelName.toLowerCase();
        this._helperModels = helperModels.map(function (model) {
            return new Model(model).getModel();
        });
    }
    /**
     * Get all registered express routes
     * @return {Router} - Express Router Object
     */
    HydycoRoutes.prototype.Routes = function () {
        return this._boot();
    };
    /**
     * Set Allowed methods
     * @return {IAllowedMethods} allowedMethods
     */
    HydycoRoutes.prototype.allowedMethods = function () {
        var operations = this._model.raw().operations;
        return __assign({}, operations);
    };
    /**
     * Get all route paths for the model
     * @return {IRestApiPaths} restApiPaths
     */
    HydycoRoutes.prototype.curdPaths = function () {
        return {
            list: "" + this._defaultPath,
            create: "" + this._defaultPath,
            read: this._defaultPath + "/:id",
            update: this._defaultPath + "/:id",
            delete: this._defaultPath + "/:id",
            deleteAll: "" + this._defaultPath,
        };
    };
    /**
     * Custom Routes
     * @param {Router} - Express Router object
     * @param {string} - default path string
     * @param {Model} - mongoose model
     */
    HydycoRoutes.prototype.customRoutes = function (router, defaultPath, model, helperModels) {
        return router;
    };
    /**
     * Add routes methods
     * @param {IMiddleware} method - Name of the method
     * @param {Function}  middleware - Express Middleware
     */
    HydycoRoutes.prototype.addMiddleware = function (method, middleware) {
        var _a, _b, _c, _d, _e, _f;
        switch (method) {
            case "list":
                if (Array.isArray(middleware))
                    (_a = this._middleware.list).push.apply(_a, middleware);
                else
                    this._middleware.list.push(middleware);
                break;
            case "create":
                if (Array.isArray(middleware))
                    (_b = this._middleware.create).push.apply(_b, middleware);
                else
                    this._middleware.create.push(middleware);
                break;
            case "update":
                if (Array.isArray(middleware))
                    (_c = this._middleware.update).push.apply(_c, middleware);
                else
                    this._middleware.update.push(middleware);
                break;
            case "read":
                if (Array.isArray(middleware))
                    (_d = this._middleware.read).push.apply(_d, middleware);
                else
                    this._middleware.read.push(middleware);
                break;
            case "delete":
                if (Array.isArray(middleware))
                    (_e = this._middleware.delete).push.apply(_e, middleware);
                else
                    this._middleware.delete.push(middleware);
                break;
            case "deleteAll":
                if (Array.isArray(middleware))
                    (_f = this._middleware.deleteAll).push.apply(_f, middleware);
                else
                    this._middleware.deleteAll.push(middleware);
                break;
            default:
                throw new Error(method + " not allowed");
        }
    };
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     * @param {model} - Current Mongoose Model
     */
    HydycoRoutes.prototype.list = function (request, response, model, helperModels) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, exports.HydycoQuery)(request.mquery, model)];
                    case 1:
                        res = _a.sent();
                        this.after(res, request, response);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     */
    HydycoRoutes.prototype.create = function (request, response, model, helperModels) {
        return __awaiter(this, void 0, void 0, function () {
            var body, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = request.body;
                        return [4 /*yield*/, model.create(body)];
                    case 1:
                        res = _a.sent();
                        this.after(res, request, response);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     */
    HydycoRoutes.prototype.read = function (request, response, model, helperModels) {
        return __awaiter(this, void 0, void 0, function () {
            var params, id, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = request.params;
                        id = params.id;
                        return [4 /*yield*/, model.findById(id)];
                    case 1:
                        res = _a.sent();
                        this.after(res, request, response);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     *
     */
    HydycoRoutes.prototype.update = function (request, response, model, helperModels) {
        return __awaiter(this, void 0, void 0, function () {
            var body, params, id, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = request.body, params = request.params;
                        id = params.id;
                        return [4 /*yield*/, model.findByIdAndUpdate(id, body)];
                    case 1:
                        res = _a.sent();
                        this.after(res, request, response);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     */
    HydycoRoutes.prototype.delete = function (request, response, model, helperModels) {
        return __awaiter(this, void 0, void 0, function () {
            var params, id, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = request.params;
                        id = params.id;
                        return [4 /*yield*/, model.findByIdAndDelete(id)];
                    case 1:
                        res = _a.sent();
                        this.after(res, request, response);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all mongoose model data
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     */
    HydycoRoutes.prototype.deleteAll = function (request, response, model, helperModels) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.remove()];
                    case 1:
                        res = _a.sent();
                        this.after(res, request, response);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets called before every api call
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     * @return {HydycoRequest,Response} - Return HydycoRequest and Response
     */
    HydycoRoutes.prototype.before = function (request, response, next, model, helperModels) {
        next();
    };
    /**
     * Method Call Middleware
     */
    HydycoRoutes.prototype.methodCallMiddleware = function (request, response, next, call) {
        request.methodCall = call;
        next();
    };
    /**
     * Gets called after every api call
     * @param {HydycoRequest} - Express HydycoRequest object
     * @param {Response} - Express Response object
     */
    HydycoRoutes.prototype.after = function (res, request, response) {
        return response.send(res);
    };
    HydycoRoutes.prototype._boot = function () {
        var _this = this;
        this._router = this.customRoutes(this._router, this._defaultPath, this._model, this._helperModels);
        if (!this._router) {
            throw new Error("Custom Routes should always return Router object");
        }
        var allowedMethods = this.allowedMethods();
        this._applyMiddleware();
        if (allowedMethods.list)
            this._router.get(this.curdPaths().list, this._middleware.list, function (request, response) {
                return _this.list(request, response, _this._model, _this._helperModels);
            });
        if (allowedMethods.create)
            this._router.post(this.curdPaths().create, this._middleware.create, function (request, response) {
                return _this.create(request, response, _this._model, _this._helperModels);
            });
        if (allowedMethods.read)
            this._router.get(this.curdPaths().read, this._middleware.read, function (request, response) {
                return _this.read(request, response, _this._model, _this._helperModels);
            });
        if (allowedMethods.update)
            this._router.put(this.curdPaths().update, this._middleware.update, function (request, response) {
                return _this.update(request, response, _this._model, _this._helperModels);
            });
        if (allowedMethods.delete)
            this._router.delete(this.curdPaths().delete, this._middleware.delete, function (request, response) {
                return _this.delete(request, response, _this._model, _this._helperModels);
            });
        if (allowedMethods.deleteAll)
            this._router.delete(this.curdPaths().deleteAll, this._middleware.deleteAll, function (request, response) {
                return _this.deleteAll(request, response, _this._model, _this._helperModels);
            });
        return this._router;
    };
    /**
     * Apply Middleware to methods
     */
    HydycoRoutes.prototype._applyMiddleware = function () {
        var _this = this;
        // make routes authenticated
        // if route is not public then it is treated as authenticated route
        var modelJsonData = this._model.raw();
        ["list", "create", "update", "delete", "read", "deleteAll"].forEach(function (method) {
            var publicMethods = modelJsonData["publicMethods"];
            if (modelJsonData.show && !publicMethods[method]) {
                _this.addMiddleware(method, auth_1.makeAuth);
            }
            if (method === "list") {
                _this.addMiddleware(method, mquery({ limit: 10 }));
            }
            _this.addMiddleware(method, [
                function (request, response, next) {
                    _this.methodCallMiddleware(request, response, next, method);
                },
                function (request, response, next) {
                    _this.before(request, response, next, _this._model, _this._helperModels);
                },
            ]);
        });
    };
    return HydycoRoutes;
}());
exports.default = HydycoRoutes;
//# sourceMappingURL=routes.js.map