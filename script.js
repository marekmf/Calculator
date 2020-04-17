const display = document.querySelector('.display');
const numbers = document.querySelectorAll('[data-number]');
const allClearBtn = document.querySelector('[data-all-clear]');
const operateBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
let firstNumber;
let secondNumber;
let operator;
let displayValue = 0;

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}
function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}
function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}
function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function operate(operator, firstNumber, secondNumber) {
  if (operator === 'add') {
    return add(firstNumber, secondNumber);
  } else if (operator === 'subtract') {
    return subtract(firstNumber, secondNumber);
  } else if (operator === 'multiply') {
    return multiply(firstNumber, secondNumber);
  } else if (operator === 'divide') {
    return divide(firstNumber, secondNumber);
  }
}

// Buttons functions

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    if (
      (display.textContent === '0' && number.textContent !== '.') ||
      /[^0-9.]/.test(display.textContent)
    ) {
      display.textContent = '';
    }
    if (display.textContent.includes('.') && number.textContent === '.') {
      return;
    }
    if (!display.textContent && number.textContent === '.') {
      display.textContent = 0;
    }
    if (display.textContent.length > 13) {
      return;
    }
    display.textContent += number.textContent;
  });
});

allClearBtn.addEventListener('click', () => {
  display.textContent = '';
});

operateBtns.forEach((e) => {
  e.addEventListener('click', () => {
    firstNumber = parseFloat(display.textContent);
    display.textContent = '';
    operator = e.id;
  });
});

equalsBtn.addEventListener('click', () => {
  if (firstNumber) {
    secondNumber = parseFloat(display.textContent);
  }
  let x = operate(operator, firstNumber, secondNumber);
  display.textContent = x;

  // Divide by 0 error message
  if (secondNumber === 0 && operator === 'divide') {
    display.textContent = `Computing... Please wait...`;
  }
});
