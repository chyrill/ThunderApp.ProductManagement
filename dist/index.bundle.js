module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'mongodb://localhost/productManagement-dev'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/productManagement-test'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/productManagement'
};

const defaultConfig = {
  PORT: process.env.PORT || 3001
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class Result {
    constructor(model, message, successful) {
        this.model = model;
        this.message = message;
        this.successful = successful;
    }
}

exports.default = Result;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(5);

var _middlewares = __webpack_require__(6);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = __webpack_require__(11);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

(0, _middlewares2.default)(app);

(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      Server running on PORT: ${_constants2.default.PORT}
      ==================================
      Running on ${process.env.NODE_ENV}
      ==================================
      `);
  }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}

_mongoose2.default.connection.once('open', () => console.log('MongoDB running')).on('error', e => {
  throw e;
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(7);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(8);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(9);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(10);

var _helmet2 = _interopRequireDefault(_helmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use(helmet());
  }
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _product = __webpack_require__(12);

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  app.use('/api/v1/products', _product2.default);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _product = __webpack_require__(13);

var ProductController = _interopRequireWildcard(_product);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('', ProductController.create);
routes.delete('/:id', ProductController.remove);
routes.put('', ProductController.update);
routes.get('/:id', ProductController.getById);
routes.get('', ProductController.search);
routes.get('/all', ProductController.getAll);

exports.default = routes;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;
exports.getById = getById;
exports.remove = remove;
exports.update = update;
exports.search = search;

var _product = __webpack_require__(14);

var _product2 = _interopRequireDefault(_product);

var _Authorization = __webpack_require__(16);

var _Result = __webpack_require__(3);

var _Result2 = _interopRequireDefault(_Result);

var _SearchResult = __webpack_require__(19);

var _SearchResult2 = _interopRequireDefault(_SearchResult);

var _QueryFilters = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create(req, res) {
  var response = new _Result2.default();
  try {

    var authRes = await (0, _Authorization.Authorization)(req.headers.authorization);

    if (authRes.successful != true) {
      response.model = req.body;
      response.message = authRes.message;
      response.successful = false;
      return res.status(401).json(response);
    } else {
      req.body.Context = authRes.model.Context;
      req.body.CreatedBy = authRes.model.Name;
    }

    var productFind = await _product2.default.find({ Name: req.body.Name });

    if (productFind > 1) {
      response.model = req.body;
      response.message = "Product already existed";
      response.successful = false;
      return res.status(400).json(response);
    }

    const product = await _product2.default.create(req.body);

    response.model = product;
    response.message = "Successfully created product";
    response.successful = true;

    return res.status(201).json(response);
  } catch (e) {
    response.model = req.body;
    response.message = e.errmsg;
    response.successful = false;
    return res.status(500).json(response);
  }
}

async function getAll(req, res) {
  var result = new _SearchResult2.default();

  try {
    var authRes = await (0, _Authorization.Authorization)(req.headers.authorization);

    if (authRes.successful != true) {
      result.items = null;
      result.message = authRes.message;
      result.successful = false;
      console.log(response);
      return res.status(401).json(result);
    } else {
      req.body.Context = authRes.model.Context;
      req.body.CreatedBy = authRes.model.Name;
    }

    var productsItemsRes = await _product2.default.find({ Context: req.body.Context });

    if (productsItemsRes.length < 1) {
      result.items = null;
      result.message = "Product record not found";
      result.successful = false;
      return res.status(200).json(result);
    }

    var count = productsItemsRes.count;

    result.items = productsItemsRes;
    result.totalcount = count;
    result.pages = 0;
    result.successful = true;
    result.message = "Successfully retrieve data";

    return res.status(200).json(result);
  } catch (e) {
    result.items = null;
    result.message = e.errmsg;
    result.successful = false;
    return res.status(500).json(result);
  }
}

async function getById(req, res) {

  var result = new _Result2.default();

  try {

    var authRes = await (0, _Authorization.Authorization)(req.headers.authorization);

    if (authRes.successful != true) {
      result.model = null;
      result.message = authRes.message;
      result.successful = false;
      console.log(response);
      return res.status(401).json(result);
    } else {
      req.body.Context = authRes.model.Context;
      req.body.CreatedBy = authRes.model.Name;
    }

    var id = req.params.id;

    if (id === null) {
      result.model = null;
      result.message = "Id is required";
      result.successful = false;

      return res.status(404).json(result);
    }

    var productRes = await _product2.default.findOne({ _id: id, Context: req.body.Context });

    if (productRes === null) {
      result.model = null;
      result.message = "Item not found";
      result.successful = false;

      return res.status(400).json(result);
    }

    result.model = productRes;
    result.message = "Product found";
    result.successful = true;

    return res.status(200).json(result);
  } catch (e) {
    result.model = null;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}

async function remove(req, res) {

  var result = new _Result2.default();

  try {
    var id = req.params.id;

    if (id === null) {
      result.model = null;
      result.message = "Id is required";
      result.successful = false;

      return res.status(400).json(result);
    }

    var authRes = await (0, _Authorization.Authorization)(req.headers.authorization);

    if (authRes.successful != true) {
      result.model = null;
      result.message = authRes.message;
      result.successful = false;
      console.log(response);
      return res.status(401).json(result);
    } else {
      req.body.Context = authRes.model.Context;
      req.body.CreatedBy = authRes.model.Name;
    }

    await _product2.default.findOneAndRemove({ _id: id, Context: req.body.Context });

    result.model = null;
    result.message = "Successfully deleted record";
    result.successful = true;

    return res.status(200).json(result);
  } catch (e) {
    result.model = null;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}

async function update(req, res) {

  var result = new _Result2.default();

  try {
    var authRes = await (0, _Authorization.Authorization)(req.headers.authorization);

    if (authRes.successful != true) {
      result.model = req.body;
      result.message = authRes.message;
      result.successful = false;

      return res.status(401).json(result);
    } else {
      req.body.Context = authRes.model.Context;
      req.body.UpdatedBy = authRes.model.Name;
      req.body.DateUpdated = new Date();
    }

    var productUpdateRes = await _product2.default.findOneAndUpdate({ _id: req.body.id }, req.body, { Upsert: true, strict: false });

    result.model = productUpdateRes;
    result.message = "Successfully updated record";
    result.successful = true;

    return res.status(200).json(result);
  } catch (e) {
    result.model = req.body;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}

async function search(req, res) {

  var result = new _SearchResult2.default();

  try {

    var authRes = await (0, _Authorization.Authorization)(req.headers.authorization);

    if (authRes.successful != true) {
      result.items = null;
      result.message = authRes.message;
      result.successful = false;

      return res.status(401).json(result);
    } else {
      req.body.Context = authRes.model.Context;
      req.body.CreatedBy = authRes.model.Name;
    }

    if (req.query.limit === null || req.query.limit === undefined) {
      req.query.limit = 20;
    }
    var filters = {};
    if (req.query.Filters != null) {
      filters = (0, _QueryFilters.QueryFilters)(req.query.Filters, req.body.Context);
    } else {
      filters["Context"] = req.body.Context;
    }

    var allProduct = await _product2.default.find(filters);

    var pages = Math.ceil(allProduct.length / req.query.limit);
    var totalcount = allProduct.length;
    var productRes = await _product2.default.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit));

    if (productRes.length < 1) {
      result.items = productRes;
      result.message = "Item not found";
      result.successful = false;

      return res.status(400).json(result);
    }

    result.items = productRes;
    result.pages = pages;
    result.totalcount = totalcount;
    result.message = "Successfully retrieve list of items";
    result.successful = true;

    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    result.items = null;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(15);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ProductSchema = new _mongoose.Schema({
  Name: {
    type: String,
    unique: true,
    required: [true, 'Product Name is required!'],
    minLength: [5, 'Product Name minimum length is 5']
  },
  Description: {
    type: String,
    required: [true, 'Description is required!']
  },
  Features: {
    type: String
  },
  Context: {
    type: String
  },
  SKU: {
    type: String
  },
  Images: {
    type: [String]
  },
  DateCreated: {
    type: Date,
    default: new Date()
  },
  CreatedBy: {
    type: String
  },
  DateUpdated: {
    type: Date
  },
  UpdatedBy: {
    type: String
  }
});

exports.default = _mongoose2.default.model('Product', ProductSchema);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Authorization = Authorization;

var _axios = __webpack_require__(17);

var _axios2 = _interopRequireDefault(_axios);

var _Result = __webpack_require__(3);

var _Result2 = _interopRequireDefault(_Result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function Authorization(bearer) {
  var data = {};
  try {
    var authCode = bearer.split(" ")[1];
    await _axios2.default.post('http://localhost:3000/api/v1/userLogin/authorize', { Authorization: authCode }).then(response => {
      data = response.data;
    }).catch(err => {

      data = err.response.data;
    });
    return data;
  } catch (e) {
    console.log(e);
    result.message = e;
    result.successful = false;
    return result;
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class SearchResult {
    constructor(items, totalcount, pages, message, successful) {
        this.items = items;
        this.totalcount = totalcount;
        this.pages = pages;
        this.message = message;
        this.successful = successful;
    }
}

exports.default = SearchResult;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryFilters = QueryFilters;
function QueryFilters(filters, context) {

  var request = JSON.parse(JSON.stringify(filters));
  var result = {};

  var data = request.split(',');

  for (var i in data) {

    var propertyName = data[i].split(':')[0];
    var value = data[i].split(':')[1];
    if (value.indexOf('/') > -1) {
      var item = value.replace('/', '').replace('/', '');
      console.log(item);
      result[propertyName] = new RegExp(item, "i");
    } else {
      result[propertyName] = value;
    }
  }

  result["Context"] = context;
  console.log(result);
  return result;
};

/***/ })
/******/ ]);