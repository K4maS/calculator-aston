"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var value1 = '';
  var value2 = '';
  var operator = '';

  var Calculator =
  /*#__PURE__*/
  function () {
    function Calculator(x, y) {
      _classCallCheck(this, Calculator);

      this.x = x;
      this.y = y;
    }

    _createClass(Calculator, [{
      key: "setX",
      value: function setX(num) {
        this.x = numCheck(num);
      }
    }, {
      key: "setY",
      value: function setY(num) {
        this.y = numCheck(num);
      }
    }, {
      key: "logSum",
      value: function logSum() {
        return this.x + this.y;
      }
    }, {
      key: "logMul",
      value: function logMul() {
        return this.x * this.y;
      }
    }, {
      key: "logSub",
      value: function logSub() {
        return this.x - this.y;
      }
    }, {
      key: "logDiv",
      value: function logDiv() {
        if (this.y === 0) {
          throw new Error('second operand is 0');
        }

        return this.x / this.y;
      }
    }, {
      key: "logDiv",
      value: function logDiv() {
        if (this.y === 0) {
          throw new Error('second operand is 0');
        }

        return this.x % this.y;
      }
    }]);

    return Calculator;
  }();

  var calcEx = new Calculator(0, 0);

  function numCheck(num) {
    num = Number(num);

    if (isNaN(num)) {
      throw new Error('Value is not a number');
    }

    return num;
  }

  function drawCalcFrame(display, keyBoard) {
    var frame = document.createElement('div');
    frame.classList.add('calc__frame');
    frame.append(display, keyBoard);
    return frame;
  }

  function drawDisplay(value) {
    var display = document.createElement('div');
    display.classList.add('calc__display');
    display.textContent = value;
    return display;
  }

  function drawCalcBtn(value) {
    var button = document.createElement('button');
    button.classList.add('calc__button');
    button.textContent = value;

    if (value === 'ac') {
      calcEx.setX = 0;
      calcEx.setY = 0;
    }

    if (value === '<=') {} else if (value === '%') {} else if (value === '/') {} else if (value === 'x') {} else if (value === '-') {} else if (value === '+') {} else if (value === '.') {} else if (value === '=') {} else {}

    return button;
  }

  function drawKeyboard(keys) {
    var keyboard = document.createElement('div');
    keyboard.classList.add('calc__keyboard');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        i = _step.value;
        var button = drawCalcBtn(i);
        keyboard.append(button);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return keyboard;
  }

  function doCalculation(x, y, operator) {}

  window.addEventListener('DOMContentLoaded', function () {
    var keys = ['ac', '<=', '%', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='];
    var app = document.getElementById('app');
    var display = drawDisplay(0);
    var keyboard = drawKeyboard(keys);
    var calcFrame = drawCalcFrame(display, keyboard);
    app.append(calcFrame);
  });
})();