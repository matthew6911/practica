// файл scripts.js
window.onload = function () {
  let a = '';
  let b = '';
  let expressionResult = '';
  let selectedOperation = null;

  const outputElement = document.getElementById("result");
  const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');

  function updateDisplay(value) {
    if (!isFinite(value) || isNaN(value)) {
      outputElement.innerHTML = "Ошибка";
      a = '';
      b = '';
      selectedOperation = null;
    } else {
      outputElement.innerHTML = value;
    }
  }

  function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
      if (digit === '.' && a.includes('.')) return;
      a += digit;
      updateDisplay(a);
    } else {
      if (digit === '.' && b.includes('.')) return;
      b += digit;
      updateDisplay(b);
    }
  }

  digitButtons.forEach(button => {
    button.onclick = function () {
      const digitValue = button.innerHTML;
      onDigitButtonClicked(digitValue);
    };
  });

  document.getElementById("btn_op_mult").onclick = () => { if (a !== '') selectedOperation = 'x'; };
  document.getElementById("btn_op_plus").onclick = () => { if (a !== '') selectedOperation = '+'; };
  document.getElementById("btn_op_minus").onclick = () => { if (a !== '') selectedOperation = '-'; };
  document.getElementById("btn_op_div").onclick = () => { if (a !== '') selectedOperation = '/'; };

  document.getElementById("btn_op_equal").onclick = () => {
    if (a === '' || b === '' || !selectedOperation) return;
    switch (selectedOperation) {
      case 'x': expressionResult = (+a) * (+b); break;
      case '+': expressionResult = (+a) + (+b); break;
      case '-': expressionResult = (+a) - (+b); break;
      case '/':
        if (+b === 0) {
          updateDisplay('Ошибка: деление на 0');
          a = ''; b = ''; selectedOperation = null;
          return;
        }
        expressionResult = (+a) / (+b);
        break;
    }
    a = expressionResult.toString();
    b = '';
    selectedOperation = null;
    updateDisplay(a);
  };

  document.getElementById("btn_op_clear").onclick = () => {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    updateDisplay('0');
  };

  document.getElementById("btn_op_negate").onclick = () => {
    if (!selectedOperation && a) {
      a = (-parseFloat(a)).toString();
      updateDisplay(a);
    } else if (b) {
      b = (-parseFloat(b)).toString();
      updateDisplay(b);
    }
  };

  document.getElementById("btn_op_percent").onclick = () => {
    if (!selectedOperation && a) {
      a = (parseFloat(a) / 100).toString();
      updateDisplay(a);
    } else if (b) {
      b = (parseFloat(b) / 100).toString();
      updateDisplay(b);
    }
  };

  document.getElementById("btn_op_back").onclick = () => {
    if (!selectedOperation) {
      a = a.slice(0, -1);
      updateDisplay(a || '0');
    } else {
      b = b.slice(0, -1);
      updateDisplay(b || '0');
    }
  };

  document.getElementById("btn_op_sqrt").onclick = () => {
    if (!selectedOperation && a) {
      a = Math.sqrt(+a).toString();
      updateDisplay(a);
    }
  };

  document.getElementById("btn_op_square").onclick = () => {
    if (!selectedOperation && a) {
      a = Math.pow(+a, 2).toString();
      updateDisplay(a);
    }
  };

  function factorial(n) {
    if (n < 0 || n > 170) return 'Ошибка';
    if (n === 0 || n === 1) return '1';
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res.toString();
  }

  document.getElementById("btn_op_fact").onclick = () => {
    if (!selectedOperation && a) {
      a = factorial(+a);
      updateDisplay(a);
    }
  };

  document.getElementById("btn_digit_000").onclick = () => {
    onDigitButtonClicked("000");
  };

  document.getElementById("btn_op_acc_add").onclick = () => {
    if (a !== '' && b !== '') {
      a = (+a + +b).toString();
      b = '';
      selectedOperation = null;
      updateDisplay(a);
    }
  };

  document.getElementById("btn_op_acc_sub").onclick = () => {
    if (a !== '' && b !== '') {
      if (isNaN(a) || isNaN(b)) return;
      a = (+a - +b).toString();
      if (!isFinite(a)) {
        updateDisplay('Ошибка');
        a = ''; b = ''; selectedOperation = null;
      } else {
        b = '';
        selectedOperation = null;
        updateDisplay(a);
      }
    }
  };

  let isDarkBackground = true;
  document.getElementById("btn_color_bg").onclick = () => {
    document.body.style.backgroundColor = isDarkBackground ? "#ffffff" : "#1e1e2f";
    isDarkBackground = !isDarkBackground;
  };

  let isDefaultOutput = true;
  document.getElementById("btn_color_res").onclick = () => {
    if (isDefaultOutput) {
      outputElement.style.backgroundColor = "#fff177";
      outputElement.style.color = "#333";
    } else {
      outputElement.style.backgroundColor = "#333";
      outputElement.style.color = "#00e5ff";
    }
    isDefaultOutput = !isDefaultOutput;
  };
};
