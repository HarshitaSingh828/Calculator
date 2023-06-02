class Calculator {
  //    string previousOperandTextElement;
  //    string currentOperandTextElement;
  //    string currentOperand;
  //    string previousOperand;
  //    string operation

  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear(){
    this.currentOperand="";
    this.previousOperand="";
    this.operation=undefined;
  }

  delete(){
    this.currentOperand=this.currentOperand.toString().slice(0,-1);
  }
  //if number is . or already exists . we jsut simply return 
  appendNumber(number) {
    if (number == "." && this.currentOperand.includes(".")) return;
    //if someone press 7 so it will convert it in string and then add other numbers to it like "78"
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }


  compute(){
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    switch(this.operation){
        case "+":
            computation = prev+current;
            break;
        case "-" :
            computation = prev-current;
            break;
        case "*":
            computation = prev*current;
            break;
        case "÷":
            computation = prev/current;
            break;
        default:
            return;
    }
// after computing the vlue of current operand will hold ans and prevoperand will be empty
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand="";
  }


  chooseOperation(operation) {

    if(this.currentOperand ==="")return;
    if(this.previousOperand !==""){ //if we have something in prevoperand like 21 and we clicked + so will compute
        this.compute();
    }
    this.operation = operation;  // operation click
    this.previousOperand=this.currentOperand;// if someone write 21 it will be in current operand after clicking + it will jump to prevoperand.
    this.currentOperand=""; 
  }
  
  getDisplayNumber(number){
    const stringNumber = number.toString();//this converts a number to a string
    const integerDigit = parseFloat(stringNumber.split(".")[0]); //if someone has entered 213.456 so integer digit willbe 213
    const decimalDigit = stringNumber.split(".")[1]; //456

    let integerDisplay;

    if(isNaN(integerDigit))integerDisplay="";
    else{
    integerDisplay = integerDigit.toLocaleString("en",{maximumFractionDigits:0});  //it will give number with , using to Localstring()
    }
    //means decimal digit exits 11.2
    if(decimalDigit!=null){
        return `${integerDisplay}.${decimalDigit}`;
    }
    else{
        return integerDisplay;
    }

  }

// if some passed 123,456,789 this comma will be there in current operand
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
   
    //if we have 2334 and some use * symbol only then we go to prevoperand and update its value
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        this.getDisplayNumber(this.previousOperand) + " " + this.operation;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

//we will select all buttons using queryselectorAll all the buttons which have data-number proprty will be selected 
const numberButtons = document.querySelectorAll("[data-number]");

const operationButtons = document.querySelectorAll("[data-operation]");

const equlsButton = document.querySelector("[data-equals]")

const deleteButton = document.querySelector("[data-delete]");

const allClearButton = document.querySelector("[data-all-clear]");

const previousOperandTextElement = document.querySelector("[data-previous-operand]");

const currentOperandTextElement = document.querySelector("[data-current-operand]");

//we will be begining a cls 
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// numberbutton is a array in that we use for each means will be going to eachindex and on clicking we do two tasks using two separate functions
//appendnumber jo button ka innertext h wo append krega nd display ko update krega 

numberButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click",()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equlsButton.addEventListener("click",()=>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click",()=>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click",()=>{
    calculator.delete();
    calculator.updateDisplay();
})