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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Driver;


function Driver(attributes) {
  this.ranking = attributes.ranking;
  this.points = attributes.points;
  this.nationality = attributes.nationality;
  this.surname = attributes.surname;
  this.name = attributes.name;
  this.team = attributes.team;
  this.teamPoints = attributes.teamPoints;
  this.lastRace = attributes.lastRace;
  this.wins = attributes.wins;
  this.poles = attributes.poles;
  this.bestPosition = attributes.bestPosition;
  this.bestPositionTimes = attributes.bestPositionTimes;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passDataToView = passDataToView;

var _view = __webpack_require__(8);

var _DragAndDrop = __webpack_require__(2);

function passDataToView(drivers) {
  var view = void 0;
  var driversContainer = document.getElementById('drivers-list');

  var FLAGS = {
    "Germany": "01",
    "Australia": "02",
    "Brazil": "03",
    "Spain": "04",
    "United Kingdom": "05"
  };

  var AVATARS = {
    "Vettel": "01",
    "Button": "02",
    "Webber": "03",
    "Alonso": "04",
    "Hamilton": "05",
    "Massa": "06",
    "Rosberg": "07",
    "Schumacher": "08"
  };

  drivers.forEach(function (driver, i) {
    setTimeout(function () {
      view = document.createElement('div');
      view.className = 'driver-row';
      view.setAttribute('draggable', 'true');
      view.innerHTML = (0, _view.DriverView)(driver, AVATARS[driver.name], FLAGS[driver.nationality]);
      driversContainer.appendChild(view);
      view.classList.add('is-moving-up');

      view.addEventListener('dragstart', _DragAndDrop.handleDragStart, false);
      view.addEventListener('dragover', _DragAndDrop.handleDragOver, false);
      view.addEventListener('dragleave', _DragAndDrop.handleDragLeave, false);
      view.addEventListener('drop', _DragAndDrop.handleDrop, false);
      view.addEventListener('dragend', _DragAndDrop.handleDragEnd, false);
    }, 80 * i);
  });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function handleDrop(e) {

  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  return false;
}

function handleDragEnd(e) {
  document.querySelectorAll('.driver-row').forEach(function (row) {
    row.classList.remove('over');
  });
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  this.classList.add('over');
  e.dataTransfer.dropEffect = 'move';

  return false;
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

var dragSrcEl = null;

function handleDragStart(e) {
  this.style.opacity = '0.3';

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

exports.handleDrop = handleDrop;
exports.handleDragEnd = handleDragEnd;
exports.handleDragOver = handleDragOver;
exports.handleDragLeave = handleDragLeave;
exports.handleDragStart = handleDragStart;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DataToView = __webpack_require__(1);

Object.defineProperty(exports, 'passDataToView', {
  enumerable: true,
  get: function get() {
    return _DataToView.passDataToView;
  }
});

var _RenderDrivers = __webpack_require__(5);

Object.defineProperty(exports, 'renderDrivers', {
  enumerable: true,
  get: function get() {
    return _RenderDrivers.renderDrivers;
  }
});

var _DragAndDrop = __webpack_require__(2);

Object.defineProperty(exports, 'handleDrop', {
  enumerable: true,
  get: function get() {
    return _DragAndDrop.handleDrop;
  }
});
Object.defineProperty(exports, 'handleDragEnd', {
  enumerable: true,
  get: function get() {
    return _DragAndDrop.handleDragEnd;
  }
});
Object.defineProperty(exports, 'handleDragOver', {
  enumerable: true,
  get: function get() {
    return _DragAndDrop.handleDragOver;
  }
});
Object.defineProperty(exports, 'handleDragLeave', {
  enumerable: true,
  get: function get() {
    return _DragAndDrop.handleDragLeave;
  }
});
Object.defineProperty(exports, 'handleDragStart', {
  enumerable: true,
  get: function get() {
    return _DragAndDrop.handleDragStart;
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderDrivers = renderDrivers;

var _utils = __webpack_require__(7);

var _models = __webpack_require__(0);

var _models2 = _interopRequireDefault(_models);

var _DataToView = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderDrivers() {

  (0, _utils.getJSON)('data.json', function (data) {
    var drivers = data.drivers.map(function (attributes) {
      return new _models2.default(attributes);
    });

    var filtersButtons = document.querySelectorAll('a.main-nav__button');

    filtersButtons.forEach(function (button, i) {
      filtersButtons[i].addEventListener('click', function (e) {
        var driversContainer = document.getElementById('drivers-list');
        var buttonActiveClass = 'main-nav__button--active';

        filtersButtons.forEach(function (node) {
          node.classList.remove(buttonActiveClass);
        });
        e.currentTarget.classList.add(buttonActiveClass);

        drivers = (0, _utils.sortDataByKey)(drivers, filtersButtons[i].dataset.sort);

        // Remove all children of container before appending sorted ones
        while (driversContainer.hasChildNodes()) {
          driversContainer.removeChild(driversContainer.lastChild);
        }

        (0, _DataToView.passDataToView)(drivers);
      });
    });

    (0, _DataToView.passDataToView)(drivers);
  });
}

renderDrivers();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _models = __webpack_require__(0);

var _models2 = _interopRequireDefault(_models);

var _controllers = __webpack_require__(3);

var _controllers2 = _interopRequireDefault(_controllers);

__webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSON = getJSON;
exports.sortDataByKey = sortDataByKey;
function getJSON(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onload = function () {
    if (httpRequest.status >= 200 && httpRequest.status < 400) {
      var data = JSON.parse(httpRequest.responseText);
      if (callback) {
        callback(data);
      }
    }
  };
  httpRequest.open('GET', path, true);
  httpRequest.send();
}

function sortDataByKey(data, prop) {
  return data.sort(function (a, b) {
    return a[prop] > b[prop];
  });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DriverView = DriverView;
function DriverView(driver, avatar, flag) {
  var view = "\n      <div class=\"driver-row__item driver-row__item--first\">\n        <span class=\"driver-ranking\">" + driver.ranking + "</span>\n        <div class=\"driver-points-wrap\"><span class=\"driver-points\">" + driver.points + "</span><span class=\"driver-points-label\">Points</span></div>\n      </div>\n      <div class=\"driver-row__item driver-row__item--second\">\n        <img class=\"driver-photo\" src=\"images/drivers/" + avatar + ".png\" alt=\"\">\n      </div>\n      <div class=\"driver-row__item driver-row__item--third\">\n        <img class=\"driver-flag\" src=\"images/flags/" + flag + ".svg\" alt=\"\">\n      </div>\n      <span class=\"driver-nationality\">" + driver.nationality + "</span>\n      <div class=\"driver-details\">\n        <div><span class=\"driver-surname\">" + driver.surname + "</span> <span class=\"driver-name\">" + driver.name + "</span></div>\n        <div><span class=\"driver-team\">" + driver.team + "</span> <span class=\"driver-team-points\">(" + driver.teamPoints + ")</span></div>\n      </div>\n      <ul class=\"driver-row__item driver-races-data\">\n        <li class=\"driver-races-data__item\"><span class=\"race-data-figure\">" + (driver.lastRace ? driver.lastRace + "°" : "n/a") + "</span><span class=\"races-data-label\">Last GP</span></li>\n        <li class=\"driver-races-data__item\"><span class=\"race-data-figure\">" + driver.wins + "</span><span class=\"races-data-label\">Victories</span></li>\n        <li class=\"driver-races-data__item\"><span class=\"race-data-figure\">" + driver.poles + "</span><span class=\"races-data-label\">Poles</span></li>\n        <li class=\"driver-races-data__item\"><span class=\"race-data-figure\">" + driver.bestPosition + "\xB0</span><span class=\"race-data-figure race-data-figure--tiny\">" + (driver.bestPositionTimes ? "(" + driver.bestPositionTimes + "x)" : "") + "</span><span class=\"races-data-label\">Best Position</span></li>\n      </ul>\n  ";
  return view;
}

/***/ })
/******/ ]);