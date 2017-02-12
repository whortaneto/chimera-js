(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("chimera", [], factory);
	else if(typeof exports === 'object')
		exports["chimera"] = factory();
	else
		root["chimera"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _meruem = __webpack_require__(1);

var _meruem2 = _interopRequireDefault(_meruem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chimera = function () {
  var _setController = function _setController(controllerName) {
    return _meruem2.default.setController(controllerName);
  };

  return {
    setController: _setController
  };
}();

exports.default = Chimera;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _neferpitou = __webpack_require__(2);

var _neferpitou2 = _interopRequireDefault(_neferpitou);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Module responsible for managing the controllers running in a web worker.
*/
var Meruem = function Meruem() {
  var _methodBuilder = function _methodBuilder(controller, worker) {
    var controllerWithMethods = {};

    var _loop = function _loop(method) {
      var methodRefence = method;

      controllerWithMethods[methodRefence] = function () {
        var _arguments = arguments;

        return new Promise(function (resolve, reject) {
          var functionCall = {
            methodName: methodRefence,
            arguments: [].slice.call(_arguments)
          };

          worker.postMessage(JSON.stringify(functionCall));
          worker.onmessage = function (e) {
            var functionReturn = JSON.parse(e.data);

            if (functionReturn.hasOwnProperty('result')) {
              resolve(functionReturn.result);
            }
          };
        });
      };
    };

    for (var method in controller) {
      _loop(method);
    }

    return controllerWithMethods;
  };

  var _createControllerObject = function _createControllerObject(controllerName) {
    return new Promise(function (resolve, reject) {
      var worker = new _neferpitou2.default('./chimera/neferpitou.js');

      worker.postMessage(controllerName);

      worker.onmessage = function (e) {
        var controller = JSON.parse(e.data);

        resolve(_methodBuilder(controller, worker));
      };
    });
  };

  var _setController = function _setController(controllerName) {
    return _createControllerObject(controllerName);
  };

  return {
    setController: _setController
  };
};

exports.default = Meruem();
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
	return new Worker(__webpack_require__.p + "neferpitou.worker.js");
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chimera = __webpack_require__(0);

var _chimera2 = _interopRequireDefault(_chimera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _chimera2.default;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=chimera.js.map