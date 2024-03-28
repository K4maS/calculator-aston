(()=>{
    'use struct'

    const keys = ['ac', '⇐', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3' ,'+', '0', '.', '='];

    let value = '';
    let value1 = '';
    let value2 = '';

    let value1IsEmpty = true;
    let operator = '';
    let result = 0;
    
    let lastRender = false;

    // Отчистка всего
    function AllClear () {
        value = '';
        value1 = '';
        value2 = '';
    
        value1IsEmpty = true;
        operator = '';
        result = 0;
        
        lastRender = false;
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

        // Полная отчистка
        if(btnValue === 'ac') { 
            AllClear()
        }

        // Посимвольная отчистка
        else if (btnValue === '⇐') {
            try {
            if(result) {
                result = 0; 
            }

            else if(value2) {
                value2 = value2.slice(0, -1);
            }

            else if(operator) {
                operator = '';
            }

            else if(value1) {
                value1 = value1.slice(0, -1);
                value1IsEmpty = true;
            }
            value = value.slice(0, -1);}
            catch(err) {
                    // console.warn(err);
                    AllClear()
            }
        }

        // Проверка на все операнды кроме -
        else if(operandsList.includes(btnValue) ) {
            if( value1 !== '') {
                getRepeatResult(btnValue) 
            }
        } 
        
        // Проверка на -
        else if(btnValue === '-' ) {
            if( !value1.includes('-') && value1 === '') {
                value = btnValue +  value;
            }
            else if( !value1.includes('-') && operator && value2 === '') {
                value = btnValue + value;
            }
            else if(value1.length > 1) {
                getRepeatResult(btnValue) 
            }
        } 
        
        else if(btnValue === '.') {
            
            if(value === '') {
                value = '0.';
            }
            if(!value.includes('.')){
                value = value+btnValue;
            }
        } 
        
        else if(btnValue === '=') {
            getRepeatResult('', '')
        } 
        
        else {
            if(btnValue === '0' && (value=== '' || value === '-0')) {
                
            }
            else if(!(value1 === result && !operator)) {
                value = value + btnValue;
            }
        }
        


        if(value1IsEmpty) {
     
            value1 = value;
            
        }
        else {
            value2 = value;
        }
 
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
        let x =  Number(value1);
        let y = Number(value2);
        
       try {
       
        if(operator === '+') {
            result = x + y;
        }
        if(operator === '-') {
            result =  x - y;
        }
        if(operator === '/') {
            result =  x / y;
        }
        if(operator === '%') {
            result =  x % y;
        }
        if(operator === 'x') {
            result =  x * y;
        }
        
        lastRender = true;
        operator = '';
       }
       catch (err) {
        // Render(err.message)
       } 
       return result = Math.round(result*100)/100 ;
    }

    // При повторном нажатии на оператор
    function getRepeatResult(btnValue, val = '') { 
        if(value1 && value2) { 
            getResult();
            value1 = result;
            value2 = '';
            lastRender = false;
        } 

        if(!operator) {
            operator = btnValue;
        }

        value1IsEmpty = false;
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
    
    // Первый рендер
    Render(0);
})();