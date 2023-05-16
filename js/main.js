const display = document.getElementById('display');
const historyContainer = document.getElementById('history');
const buttons = [
  ['AC', 'C', '/', '*'],
  ['9', '8', '7', '-'],
  ['6', '5', '4', '+'],
  ['3', '2', '1', '0'],
  ['.', '=']
];
let history = [];

function appendValue(value) {
  display.value += value;
}

function calculate() {
  const expression = display.value;
  if (expression) {
    try {
      const result = eval(expression);
      display.value = result;
      history.push(expression + ' = ' + result);
      updateHistory();
    } catch (error) {
      display.value = 'Error';
    }
  }
}

function clearDisplay() {
  display.value = '';
}

function clearAll() {
  display.value = '';
  history = [];
  updateHistory();
}

function updateHistory() {
  historyContainer.innerHTML = '';
  for (let i = history.length - 1; i >= 0; i--) {
    const item = document.createElement('p');
    item.textContent = history[i];
    historyContainer.appendChild(item);
  }
}

function createButtons() {
  const buttonsContainer = document.querySelector('.buttons');
  buttons.forEach(row => {
    const rowContainer = document.createElement('div');
    rowContainer.className = 'button-row';
    row.forEach(buttonValue => {
      const button = document.createElement('button');
      button.textContent = buttonValue;
      button.addEventListener('click', function() {
        if (buttonValue === 'C') {
          clearDisplay();
        } else if (buttonValue === 'AC') {
          clearAll();
        } else if (buttonValue === '=') {
          calculate();
        } else {
          appendValue(buttonValue);
        }
      });
      rowContainer.appendChild(button);
    });
    buttonsContainer.appendChild(rowContainer);
  });
}

createButtons();
