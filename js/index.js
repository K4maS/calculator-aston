(()=>{

    let value1 = '';
    let value2 = '';
    let operator = '';

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
        logDiv() {
            if(this.y === 0) {
                throw new Error('second operand is 0');
            }
            return this.x % this.y;
        }
    }
    
    const calcEx = new Calculator (0, 0)

    function numCheck(num) {
        num = Number(num);
        if(isNaN(num)) {
            throw new Error('Value is not a number');
        }
        return num;
    }
    

    function drawCalcFrame (display, keyBoard) {
        const frame =  document.createElement('div');
        frame.classList.add('calc__frame');
        frame.append(display, keyBoard);
        return frame;
    }

    function drawDisplay (value) {
        const display =  document.createElement('div');
        display.classList.add('calc__display');
        display.textContent = value;
        return display;
    }

    function drawCalcBtn (value) {

        const button =  document.createElement('button');
        button.classList.add('calc__button');
        button.textContent = value;

        if(value === 'ac') {
            calcEx.setX = 0;
            calcEx.setY = 0;
        }
        if(value === '<=') {

        } else if(value === '%') {

        } else if(value === '/') {

        } else if(value === 'x') {

        } else if(value === '-') {

        } else if(value === '+') {

        } else if(value === '.') {

        } else if(value === '=') {

        } else {
            
        }
        
        return button;
    }
    function drawKeyboard (keys) {
        const keyboard =  document.createElement('div');
        keyboard.classList.add('calc__keyboard');
        for(i of keys){
            const button = drawCalcBtn(i);
            keyboard.append(button);
        }

        return keyboard;
    }
    function doCalculation (x, y, operator) {

    }
 
    window.addEventListener('DOMContentLoaded', ()=> {
        const keys = ['ac', '<=', '%', '/', 7, 8,9,'x',4,5,6, '-',1,2,3,'+', 0, '.', '='];

        const app = document.getElementById('app');
        const display = drawDisplay(0);
        const keyboard = drawKeyboard(keys);

        const calcFrame = drawCalcFrame(display, keyboard);


        app.append(calcFrame);
    })
})();