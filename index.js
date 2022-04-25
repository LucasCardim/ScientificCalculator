// variaveis globais:

const POWER = 'POWER(';
const FACTORIAL = 'FACTORIAL(';
const operatorsArray = ['+', '-', '*', '/'];
const mathData = {
  operation: [],
  formula: [],
};
let ans = 0;

// botoes da interface da calculadora:
// um array de objetos, onde, o nome sera colocado no id do botao no DOM e o symbol sera a interface que o usuario verá.

const buttons = [
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
    formula: POWER,
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
    formula: 'trig(Math.cos,',
    type: 'trigFunction',
  },
  {
    name: 'sin',
    symbol: 'sin',
    formula: 'trig(Math.sin,',
    type: 'trigFunction',
  },
  {
    name: 'tan',
    symbol: 'tan',
    formula: 'trig(Math.tan,',
    type: 'trigFunction',
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
    name: 'acos',
    symbol: 'acos',
    formula: 'invTrig(Math.acos,',
    type: 'trigFunction',
  },
  {
    name: 'asin',
    symbol: 'asin',
    formula: 'invTrig(Math.asin,',
    type: 'trigFunction',
  },
  {
    name: 'atan',
    symbol: 'atan',
    formula: 'invTrig(Math.atan,',
    type: 'trigFunction',
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
    formula: FACTORIAL,
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
    formula: POWER,
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
  {
    name: 'history',
    symbol: 'HIS',
    formula: false,
    type: 'key',
  },
];

// selecionando os elementos no DOM:

const inElement = document.querySelector('.in');
const outValueElement = document.querySelector('.op-value');
const resValueElement = document.querySelector('.res-value');

// função que cria os botoes no DOM:

const createInterfaceButtons = () => {
  const buttonsPerRow = 8;
  let buttonsCount = 0;

  buttons.forEach(button => {
    if (buttonsCount % buttonsPerRow === 0) {
      inElement.innerHTML += `<section class="row"></section>`;
    }
    const row = document.querySelector('.row:last-child'); // seleciona a ultima linha na interface
    row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;

    buttonsCount += 1;
  });
};

createInterfaceButtons();

// selecionando os botoes RAD e DEG no DOM:
let RADIAN = true;
const radButton = document.getElementById('rad');
const degButton = document.getElementById('deg');

// a calculadora sera sempre inicializada com o button rad abilitado, entao a classe angle estara presente no radButton:

radButton.classList.add('angle');

// funçao que ativa a resposta em radianos (rad) ou graus (deg)

const toggleRadDeg = () => {
  radButton.classList.toggle('angle');
  degButton.classList.toggle('angle');
};

// funçao do event listener para cada click nos botoes criados

const buttonsEvents = () => {
  inElement.addEventListener('click', e => {
    const eTarget = e.target;

    buttons.forEach(button => {
      if (button.name === eTarget.id) {
        doMath(button);
      }
    });
  });
};

buttonsEvents();

// funçao que compara os tipos de cada botao e faz um push no array mathData.operation e mathData.formula com o respectivo simbolo e formula e faz a operaçao matematica correspondente

const doMath = button => {
  console.log(button);
  if (button.type === 'op') {
    mathData.operation.push(button.symbol);
    mathData.formula.push(button.formula);
  } else if (button.type === 'number') {
    mathData.operation.push(button.symbol);
    mathData.formula.push(button.formula);
  } else if (button.type === 'trigFunction') {
    mathData.operation.push(button.symbol + '(');
    mathData.formula.push(button.formula);
  } else if (button.type === 'mathFunction') {
    let symbol;
    let formula;

    if (button.name === 'factorial') {
      symbol = '!';
      formula = button.formula;
      mathData.operation.push(symbol);
      mathData.formula.push(formula);
    } else if (button.name === 'power') {
      symbol = '^(';
      formula = button.formula;

      mathData.operation.push(symbol);
      mathData.formula.push(formula);
    } else if (button.name === 'square') {
      symbol = '^(';
      formula = button.formula;

      mathData.operation.push(symbol);
      mathData.formula.push(formula);

      mathData.operation.push('2)');
      mathData.formula.push('2)');
    } else if (button.name === 'ln') {
      symbol = 'ln(';
      formula = button.formula + '(';

      mathData.operation.push(symbol);
      mathData.formula.push(formula);
    } else if (button.name === 'log') {
      symbol = 'log(';
      formula = button.formula + '(';

      mathData.operation.push(symbol);
      mathData.formula.push(formula);
    } else if (button.name === 'exp') {
      symbol = 'exp(';
      formula = button.formula + '(';

      mathData.operation.push(symbol);
      mathData.formula.push(formula);
    } else {
      symbol = button.symbol + '(';
      formula = button.formula + '(';
      mathData.operation.push(symbol);
      mathData.formula.push(formula);
    }
  } else if (button.type === 'key') {
    if (button.name === 'clear') {
      mathData.operation = [];
      mathData.formula = [];

      updateOutResult(0);
    } else if (button.name === 'delete') {
      mathData.operation.pop(); // remove o ultimo elemento do array
      mathData.formula.pop();
    } else if (button.name === 'rad') {
      RADIAN = true;
      toggleRadDeg();
    } else if (button.name === 'deg') {
      RADIAN = false;
      toggleRadDeg();
    } else if (button.name === 'history') {
      alert(`${formulaString} = ${ans}`);
    }
  } else if (button.type === 'calculate') {
    formulaString = mathData.formula.join('');

    let powSearchResult = searchArray(mathData.formula, POWER);
    let factorialSearchResult = searchArray(mathData.formula, FACTORIAL);

    // pegando as bases das potencias no array e substituindo pela formula correta:

    const bases = baseGetter(mathData.formula, powSearchResult);
    bases.forEach(b => {
      let toReplace = b + POWER;
      let replacement = 'Math.pow(' + b + ',';

      formulaString = formulaString.replace(toReplace, replacement);
    });

    const numbers = numGetter(mathData.formula, factorialSearchResult);

    numbers.forEach(n => {
      formulaString = formulaString.replace(n.toReplace, n.replacement);
    });

    // Calculando de fato
    let result;
    try {
      result = eval(formulaString);
    } catch (e) {
      if (e instanceof SyntaxError) {
        result = 'Syntax Error!';
        updateOutResult(result);
        return;
      }
    }

    // salvando o resultado na variavel ans
    ans = result;
    mathData.operation = [result];
    mathData.formula = [result];
    updateOutResult(result);
    return;
  }

  updateOutOp(mathData.operation.join(''));
};

// funçao que pega os numeros que estao sendo fatorializados:

const numGetter = (formula, factorialSearchResult) => {
  let numbersArray = [];
  let factSequence = 0;

  factorialSearchResult.forEach(i => {
    let number = [];
    let nextI = i + 1;
    let nextInput = formula[nextI];

    if (nextI === FACTORIAL) {
      factSequence += 1;
      return;
    }

    let firstFactorialI = i - factSequence;
    let previousI = firstFactorialI - 1;
    let parenthesisCount = 0;

    while (previousI >= 0) {
      if (formula[previousI] === '(') parenthesisCount -= 1;
      if (formula[previousI] === ')') parenthesisCount += 1;

      let isOperator = false;

      operatorsArray.forEach(op => {
        if (formula[previousI] === op) isOperator = true;
      });

      if (isOperator && parenthesisCount === 0) {
        break;
      }

      number.unshift(formula[previousI]);
      previousI -= 1;
    }

    let numStr = number.join('');
    const factorial = 'factorial(';
    const closeParenthesis = ')';
    let times = factSequence + 1;
    let toReplace = numStr + FACTORIAL.repeat(times);
    let replacement = factorial.repeat(times) + numStr + closeParenthesis;

    numbersArray.push({
      toReplace: toReplace,
      replacement: replacement,
    });

    factSequence = 0;
  });

  return numbersArray;
};

// funçao que pega as bases das potencias no array:

const baseGetter = (formula, powSearchResult) => {
  let powBases = []; // array onde as bases serao salvas.

  powSearchResult.forEach(i => {
    let base = []; // base atual.

    let parenthesisCount = 0;

    let prevInd = i - 1;

    while (prevInd >= 0) {
      if (formula[prevInd] === '(') parenthesisCount -= 1;
      if (formula[prevInd] === ')') parenthesisCount += 1;

      let isOperator = false;

      operatorsArray.forEach(op => {
        if (formula[prevInd] === op) isOperator = true;
      });

      let isPower = formula[prevInd] === POWER;

      if ((isOperator && parenthesisCount === 0) || isPower) break;

      base.unshift(formula[prevInd]);

      prevInd -= 1;
    }

    powBases.push(base.join(''));
  });

  return powBases;
};

// buscando um array

const searchArray = (arr, key) => {
  let searchResult = [];
  arr.forEach((el, i) => {
    if (el === key) searchResult.push(i);
  });

  return searchResult;
};

// funçao que atualiza a operaçao no output

const updateOutOp = op => (outValueElement.innerHTML = op);

// funçao que atualiza o resultado da operaçao

const updateOutResult = res => (resValueElement.innerHTML = res);

// funçao que converte o angulo de graus para radianos, se o rad estiver ativado, simplesmente chama a funçao definida na mathData.formula (callback);

const trig = (callback, angle) => {
  if (!RADIAN) {
    angle *= Math.PI / 180; // formula para trasformar graus em radianos
  }

  return callback(angle); // chama a respectiva Math.trigo de cada propriedade, definida no array mathData.formula
};

// funçao que calcula degrees para radians. Primeiro avalia-se se rad esta abilitado(se true retorna o callback(value)) se false, retorna o valor em graus(deg);

const invTrig = (callback, value) => {
  let angle = callback(value); // chama a respectiva Math.trigo de cada propriedade, definida no array mathData.formula

  if (!RADIAN) {
    angle *= 180 / Math.PI; // formula para tranformar radianos em graus
  }

  return angle;
};

// funçao fatorial

const factorial = n => {
  if (n % 1 !== 0) return gamma(n + 1); // para numeros decimais, chamamos a funçao gamma que é usada para calcular aproximaçoes decimais usando a aproximaçao de Lanczo.

  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;

  for (let i = 1; i <= n; i += 1) {
    result *= i;
    if (result === Infinity) return Infinity;
  }

  return result;
};

// funçao gamma, utilizada para calcular aproximaçoes decimais, utilizando o metodo de aproximaçoes de Lanczo:
// retirada e adpatada de: http://jsfiddle.net/Fzy9C/

const gamma = z => {
  let g = 7; // representa a precisao desejada, ou seja, 7 casas decimais;
  let C = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716 * Math.pow(10, -6),
    1.5056327351493116 * Math.pow(10, -7),
  ]; // sao as constantes utilizadas na formula de Lanczo;

  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  } else {
    z -= 1;

    let x = C[0];
    for (let i = 1; i < g + 2; i += 1) {
      x += C[i] / (z + i);
    }

    let t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
  }
};
