(()=>{

    'use struct'

    const keys = ['ac', '⇐', '%', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2,3 ,'+', 0, '.', '='];

    let value = '';
    let value1 = '';
    let value2 = '';

    let value1IsEmpty = true;
    let operator = '';

    let result = 0;
    let lastRender = false;

    // Класс вычисления
    class Calculator {
        constructor (x, y) {
            this.x = x;
            this.y = y;
        }
    
        setX(num) {
           this.x = numCheck(num);
            
        }
        setY(num) {
    
            this.y = numCheck(num);
          
        }
    
        logSum() {
            return this.x + this.y;
        }
    
        logMul() {
            return this.x * this.y;
        }
    
        logSub() {
            return this.x - this.y;
        }
    
        logDiv() {
            if(this.y === 0) {
                throw new Error('second operand is 0');
            }
            return this.x / this.y;
        }
        logDivCirc() {
            if(this.y === 0) {
                throw new Error('second operand is 0');
            }
            return this.x % this.y;
        }
    }
    
    // Создал экземпляр калсса
    const calculatorExemplar = new Calculator (0, 0)

    // Проверка на число
    function numCheck(num) {
        
        num = Number(num);
        
        if(isNaN(num)) {
            throw new Error('Value is not a number');
        }

        return num;

    }
    
    // Рисует корпус калькулятора
    function drawCalcFrame (keyBoard, display) {
        
        const frame =  document.createElement('div');
        
        frame.classList.add('calc__frame');
        frame.append(display, keyBoard);
       
        return frame;

    }

    // Рисует дисплей, принимает текст
    function drawDisplay (value) {
        
        const display =  document.createElement('div');
        
        display.classList.add('calc__display');
        display.textContent = value;
        
        return display;

    }

    // Рисует кнопку, принимпет символ
    function drawCalcBtn (btnValue) {
        
        const button =  document.createElement('button');
        
        button.classList.add('calc__button');
        button.textContent = btnValue;
       
        button.addEventListener('click', ()=> {
            console.log(btnValue)
            doClick(btnValue)});

        return button;
    }

    // По саписку символов рисует клавитатуру
    function drawKeyboard (keys) {
        
        const keyboard =  document.createElement('div');
        
        keyboard.classList.add('calc__keyboard');
        for(i of keys){
            const button = drawCalcBtn(i);
            keyboard.append(button);
        }
        
        return keyboard;
    }

    // При нажатии на кнопку
    function doClick (btnValue) {
        
        const operandsList = [ '%', '/' , 'x',  '+' ];
    

     

        if(btnValue === 'ac') {
            
            calculatorExemplar.setX = 0;
            calculatorExemplar.setY = 0;
            
            value1 = '';
            value2 = '';
            value =  '';
            result = 0;
            operator = '';
            value1IsEmpty = true;

        }

        else if (btnValue === '⇐') {
            
            if(result) {
                result = String(result).slice(0, -1);
            }
            
            if(result) {
                result = String(result).slice(0, -1);
            }
        }
        // else if('%/x+'.includes(btnValue)) {
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
 
        else if(isNaN(btnValue) && operandsList.includes(btnValue)) {
            getRepeatResult(btnValue) 
        } 
        
        else if(btnValue === '-' ) {
            if( value1 === '') {
                value = btnValue +  value;
            }
            if( operator && value2 === '') {
                value = btnValue +  value;
            }
            else {
                getRepeatResult(btnValue) 
            }
        } 
        
        else if(btnValue === '.') {
            value = value+btnValue;
        } 
        
        else if(btnValue === '=') {
            getRepeatResult('', value)
        } 
        
        else {
            value = value + btnValue;
        }
        


        if(value1IsEmpty) {
            value1 = value;
        }
        else {
            value2 = value;
        }
        
        console.log(value1);
        console.log(operator);
        console.log(value2);
        if(lastRender) {
            Render(`${value1}${operator}${value2}=${result}`)
            
            lastRender = false;
        }
        else {
            if(value1 === '' && value2 === '') {
                Render(result)
            }else {
                Render(`${value1}${operator}${value2}`)
            }
            
        }
        

    }

    // результат мат операции
    function getResult() {
       try {
        console.log('va1', value1, 'va2', value2);
        calculatorExemplar.setX(Number(value1));
        calculatorExemplar.setY(Number(value2));
        if(operator === '+') {
            result = calculatorExemplar.logSum();
        }
        if(operator === '-') {
            result = calculatorExemplar.logSub();
        }
        if(operator === '/') {
            result = calculatorExemplar.logDiv();
        }
        if(operator === '%') {
            result = calculatorExemplar.logDivCirc();
        }
        if(operator === 'x') {
            result = calculatorExemplar.logMul();
        }
        
        lastRender = true;
       }
       catch (err) {
        Render('err')
       } 

     
    }

    function getRepeatResult(btnValue, val = '') { 
        if(value1 && value2) { 
            getResult();
            value1 = result;
            value2 = '';
            lastRender = false;
        } 
        
        value1IsEmpty = false;
        operator = btnValue;
        value = val;
 
    }

    // Отрисовка калькулятора
    const Render = (displayText) => {
        
        const keyboard = drawKeyboard(keys);
        
        app.innerHTML = '';

        const display = drawDisplay(displayText);
        const calcFrame = drawCalcFrame(keyboard, display);
        
        app.append(calcFrame);
        
    }  

    Render(0);

})();