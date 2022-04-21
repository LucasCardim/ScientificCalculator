// selecionando os elementos no DOM:

const inElement = document.querySelector('.in');
const outValueElement = document.querySelector('.op value');
const resValueElement = document.querySelector('.res value');

// variaveis globais:

const operatorsArray = ['+', '-', '*', '/'];
const pow = 'POWER(';
const factorial = 'FACTORIAL';
const mathData = {
  operation: [],
  formula: [],
};

// botoes da interface da calculadora:
// um array de objetos, onde, o nome sera colocado no id do botao no DOM e o symbol sera a interface que o usuario verá.
let buttons = [
  {
    name: 'rad',
    symbol: 'RAD',
    formula: false,
    type: 'key',
  },
  {
    name: 'deg',
    symbol: 'DEG',
    formula: false,
    type: 'key',
  },
  {
    name: 'square-root',
    symbol: '√',
    formula: 'Math.sqrt',
    type: 'mathFunction',
  },
  {
    name: 'square',
    symbol: 'x²',
    formula: pow,
    type: 'mathFunction',
  },
  {
    name: 'open-parenthesis',
    symbol: '(',
    formula: '(',
    type: 'number',
  },
  {
    name: 'close-parenthesis',
    symbol: ')',
    formula: ')',
    type: 'number',
  },
  {
    name: 'clear',
    symbol: 'C',
    formula: false,
    type: 'key',
  },
  {
    name: 'delete',
    symbol: '⌫',
    formula: false,
    type: 'key',
  },
  {
    name: 'pi',
    symbol: 'π',
    formula: 'Math.PI',
    type: 'number',
  },
  {
    name: 'cos',
    symbol: 'cos',
    formula: 'trigo(Math.cos,',
    type: 'trigo_function',
  },
  {
    name: 'sin',
    symbol: 'sin',
    formula: 'trigo(Math.sin,',
    type: 'trigo_function',
  },
  {
    name: 'tan',
    symbol: 'tan',
    formula: 'trigo(Math.tan,',
    type: 'trigo_function',
  },
  {
    name: '7',
    symbol: 7,
    formula: 7,
    type: 'number',
  },
  {
    name: '8',
    symbol: 8,
    formula: 8,
    type: 'number',
  },
  {
    name: '9',
    symbol: 9,
    formula: 9,
    type: 'number',
  },
  {
    name: 'division',
    symbol: '÷',
    formula: '/',
    type: 'op',
  },
  {
    name: 'e',
    symbol: 'e',
    formula: 'Math.E',
    type: 'number',
  },
  {
    name: 'arccos',
    symbol: 'acos',
    formula: 'invTrig(Math.acos,',
    type: 'trigo_function',
  },
  {
    name: 'arcsin',
    symbol: 'asin',
    formula: 'invTri(Math.asin,',
    type: 'trigo_function',
  },
  {
    name: 'arctan',
    symbol: 'atan',
    formula: 'invTrig(Math.atan,',
    type: 'trigo_function',
  },
  {
    name: '4',
    symbol: 4,
    formula: 4,
    type: 'number',
  },
  {
    name: '5',
    symbol: 5,
    formula: 5,
    type: 'number',
  },
  {
    name: '6',
    symbol: 6,
    formula: 6,
    type: 'number',
  },
  {
    name: 'multiplication',
    symbol: '×',
    formula: '*',
    type: 'op',
  },
  {
    name: 'factorial',
    symbol: '×!',
    formula: factorial,
    type: 'mathFunction',
  },
  {
    name: 'exp',
    symbol: 'exp',
    formula: 'Math.exp',
    type: 'mathFunction',
  },
  {
    name: 'ln',
    symbol: 'ln',
    formula: 'Math.log',
    type: 'mathFunction',
  },
  {
    name: 'log',
    symbol: 'log',
    formula: 'Math.log10',
    type: 'mathFunction',
  },
  {
    name: '1',
    symbol: 1,
    formula: 1,
    type: 'number',
  },
  {
    name: '2',
    symbol: 2,
    formula: 2,
    type: 'number',
  },
  {
    name: '3',
    symbol: 3,
    formula: 3,
    type: 'number',
  },
  {
    name: 'subtraction',
    symbol: '–',
    formula: '-',
    type: 'op',
  },
  {
    name: 'power',
    symbol: 'x<sup>y</sup>',
    formula: pow,
    type: 'mathFunction',
  },
  {
    name: 'ANS',
    symbol: 'ANS',
    formula: 'ans',
    type: 'number',
  },
  {
    name: 'percent',
    symbol: '%',
    formula: '/100',
    type: 'number',
  },
  {
    name: 'comma',
    symbol: '.',
    formula: '.',
    type: 'number',
  },
  {
    name: '0',
    symbol: 0,
    formula: 0,
    type: 'number',
  },
  {
    name: 'calculate',
    symbol: '=',
    formula: '=',
    type: 'calculate',
  },
  {
    name: 'addition',
    symbol: '+',
    formula: '+',
    type: 'op',
  },
];

// função que cria os botoes no DOM:

const createInterfaceButtons = () => {
  const buttonsPerRow = 8;
  let buttonsCount = 0;

  buttons.forEach(button => {
    if (buttonsCount % buttonsPerRow == 0) {
      inElement.innerHTML += `<section class="row"></section>`;
    }
    const row = document.querySelector('.row:last-child'); // seleciona a ultima linha na interface
    row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;

    buttonsCount += 1;
  });
};

createInterfaceButtons();

// funçao do event listener para cada click nos botoes criados

const buttonsEvents = () => {
  inElement.addEventListener('click', e => {
    const eTarget = e.target;

    buttons.forEach(button => {
      if (button.name === eTarget.id) doMath(button);
    });
  });
};

buttonsEvents();
