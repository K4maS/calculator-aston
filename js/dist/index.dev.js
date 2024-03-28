"use strict";

(function () {
  'use struct';

  var keys = ['ac', '⇐', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
  var value = '';
  var value1 = '';
  var value2 = '';
  var value1IsEmpty = true;
  var operator = '';
  var result = 0;
  var lastRender = false; // Отчистка всего

  function AllClear() {
    value = '';
    value1 = '';
    value2 = '';
    value1IsEmpty = true;
    operator = '';
    result = 0;
    lastRender = false;
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
    var operandsList = ['%', '/', 'x', '+']; // Полная отчистка

    if (btnValue === 'ac') {
      AllClear();
    } // Посимвольная отчистка
    else if (btnValue === '⇐') {
        try {
          if (result) {
            result = 0;
          } else if (value2) {
            value2 = value2.slice(0, -1);
          } else if (operator) {
            operator = '';
          } else if (value1) {
            value1 = value1.slice(0, -1);
            value1IsEmpty = true;
          }

          value = value.slice(0, -1);
        } catch (err) {
          // console.warn(err);
          AllClear();
        }
      } // Проверка на все операнды кроме -
      else if (operandsList.includes(btnValue)) {
          if (value1 !== '') {
            getRepeatResult(btnValue);
          }
        } // Проверка на -
        else if (btnValue === '-') {
            if (!value1.includes('-') && value1 === '') {
              value = btnValue + value;
            } else if (!value1.includes('-') && operator && value2 === '') {
              value = btnValue + value;
            } else if (value1.length > 1) {
              getRepeatResult(btnValue);
            }
          } else if (btnValue === '.') {
            if (value === '') {
              value = '0.';
            }

            if (!value.includes('.')) {
              value = value + btnValue;
            }
          } else if (btnValue === '=') {
            getRepeatResult('', '');
          } else {
            if (btnValue === '0' && (value === '' || value === '-0')) {} else if (!(value1 === result && !operator)) {
              value = value + btnValue;
            }
          }

    if (value1IsEmpty) {
      value1 = value;
    } else {
      value2 = value;
    }

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
    var x = Number(value1);
    var y = Number(value2);

    try {
      if (operator === '+') {
        result = x + y;
      }

      if (operator === '-') {
        result = x - y;
      }

      if (operator === '/') {
        result = x / y;
      }

      if (operator === '%') {
        result = x % y;
      }

      if (operator === 'x') {
        result = x * y;
      }

      lastRender = true;
      operator = '';
    } catch (err) {// Render(err.message)
    }

    return result = Math.round(result * 100) / 100;
  } // При повторном нажатии на оператор


  function getRepeatResult(btnValue) {
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (value1 && value2) {
      getResult();
      value1 = result;
      value2 = '';
      lastRender = false;
    }

    if (!operator) {
      operator = btnValue;
    }

    value1IsEmpty = false;
    value = val;
  } // Отрисовка калькулятора


  var Render = function Render(displayText) {
    var keyboard = drawKeyboard(keys);
    app.innerHTML = '';
    var display = drawDisplay(displayText);
    var calcFrame = drawCalcFrame(keyboard, display);
    app.append(calcFrame);
  }; // Первый рендер


  Render(0);
})();