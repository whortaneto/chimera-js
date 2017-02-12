/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
  Module responsible for encapsulate the back-end scripts in a web worker
*/
var Pitou = function () {
  var _buildControllerObject = function _buildControllerObject() {
    var controllerObject = {};

    for (var method in Pitou.controller) {
      controllerObject[method] = method;
    }

    return controllerObject;
  };

  return {
    importController: function importController(controllerName) {
      importScripts(controllerName); // eslint-disable-line
    },
    buildControllerObject: _buildControllerObject
  };
}();

onmessage = function onmessage(e) {
  // eslint-disable-line
  if (Pitou.controller) {
    var functionCall = JSON.parse(e.data);
    var resultado = void 0;

    if (Pitou.controller.hasOwnProperty(functionCall.methodName) > -1) {
      var _Pitou$controller;

      resultado = (_Pitou$controller = Pitou.controller)[functionCall.methodName].apply(_Pitou$controller, _toConsumableArray(functionCall.arguments));
    }

    if (resultado) {
      var resultObject = {};

      resultObject = {
        result: resultado
      };
      postMessage(JSON.stringify(resultObject));
    }
  } else {
    Pitou.importController(e.data);
    var controllerObject = Pitou.buildControllerObject();

    postMessage(JSON.stringify(controllerObject));
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=neferpitou.worker.js.map