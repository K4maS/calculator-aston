"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  'use struct';

  var keys = ['ac', '⇐', '%', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='];
  var value = '';
  var value1 = '';
  var value2 = '';
  var value1IsEmpty = true;
  var operator = '';
  var result = 0;
  var lastRender = false; // Класс вычисления

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
      key: "logDivCirc",
      value: function logDivCirc() {
        if (this.y === 0) {
          throw new Error('second operand is 0');
        }

        return this.x % this.y;
      }
    }]);

    return Calculator;
  }(); // Создал экземпляр калсса


  var calculatorExemplar = new Calculator(0, 0); // Проверка на число

  function numCheck(num) {
    num = Number(num);

    if (isNaN(num)) {
      throw new Error('Value is not a number');
    }

    return num;
  } // Рисует корпус калькулятора


  function drawCalcFrame(keyBoard, display) {
    var frame = document.createElement('div');
    frame.classList.add('calc__frame');
    frame.append(display, keyBoard);
    return frame;
  } // Рисует дисплей, принимает текст


  function drawDisplay(value) {
    var display = document.createElement('div');
    display.classList.add('calc__display');
    display.textContent = value;
    return display;
  } // Рисует кнопку, принимпет символ


  function drawCalcBtn(btnValue) {
    var button = document.createElement('button');
    button.classList.add('calc__button');
    button.textContent = btnValue;
    button.addEventListener('click', function () {
      console.log(btnValue);
      doClick(btnValue);
    });
    return button;
  } // По саписку символов рисует клавитатуру


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
  } // При нажатии на кнопку


  function doClick(btnValue) {
    var operandsList = ['%', '/', 'x', '+'];

    if (btnValue === 'ac') {
      calculatorExemplar.setX = 0;
      calculatorExemplar.setY = 0;
      value1 = '';
      value2 = '';
      value = '';
      result = 0;
      operator = '';
      value1IsEmpty = true;
    } else if (btnValue === '⇐') {
      if (result) {
        result = String(result).slice(0, -1);
      }

      if (result) {
        result = String(result).slice(0, -1);
      }
    } // else if('%/x+'.includes(btnValue)) {
    //     OperatorAction()
    // }
    // else if(btnValue === '%') {
    //     OperatorAction()
    // } else if(btnValue === '/') {
    //     OperatorAction()
    // } else if(btnValue === 'x') {
    //     OperatorAction()
    // } else if(btnValue === '+') {
    //     OperatorAction()
    // }
    else if (isNaN(btnValue) && operandsList.includes(btnValue)) {
        getRepeatResult(btnValue);
      } else if (btnValue === '-') {
        if (value1 === '') {
          value = btnValue + value;
        }

        if (operator && value2 === '') {
          value = btnValue + value;
        } else {
          getRepeatResult(btnValue);
        }
      } else if (btnValue === '.') {
        value = value + btnValue;
      } else if (btnValue === '=') {
        getRepeatResult('', value);
      } else {
        value = value + btnValue;
      }

    if (value1IsEmpty) {
      value1 = value;
    } else {
      value2 = value;
    }

    console.log(value1);
    console.log(operator);
    console.log(value2);

    if (lastRender) {
      Render("".concat(value1).concat(operator).concat(value2, "=").concat(result));
      lastRender = false;
    } else {
      if (value1 === '' && value2 === '') {
        Render(result);
      } else {
        Render("".concat(value1).concat(operator).concat(value2));
      }
    }
  } // результат мат операции


  function getResult() {
    try {
      console.log('va1', value1, 'va2', value2);
      calculatorExemplar.setX(Number(value1));
      calculatorExemplar.setY(Number(value2));

      if (operator === '+') {
        result = calculatorExemplar.logSum();
      }

      if (operator === '-') {
        result = calculatorExemplar.logSub();
      }

      if (operator === '/') {
        result = calculatorExemplar.logDiv();
      }

      if (operator === '%') {
        result = calculatorExemplar.logDivCirc();
      }

      if (operator === 'x') {
        result = calculatorExemplar.logMul();
      }

      lastRender = true;
    } catch (err) {
      Render('err');
    }
  }

  function getRepeatResult(btnValue) {
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (value1 && value2) {
      getResult();
      value1 = result;
      value2 = '';
      lastRender = false;
    }

    value1IsEmpty = false;
    operator = btnValue;
    value = val;
  } // Отрисовка калькулятора


  var Render = function Render(displayText) {
    var keyboard = drawKeyboard(keys);
    app.innerHTML = '';
    var display = drawDisplay(displayText);
    var calcFrame = drawCalcFrame(keyboard, display);
    app.append(calcFrame);
  };

  Render(0);
})();