const fs = require("fs");

const NOT_DIGIT_OR_DOT = /[^\d|\.]/g;
const IS_DIGIT = /\d/g;

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  data = data.toString().split("\n");
  data = data.map((row, index) => {
    if (index !== data.length - 1) {
      return row.substring(0, row.length - 1);
    }
    return row;
  });

  let numbers = [];

  data.forEach((row, index) => {
    let digits = "";
    let positions = [];
    for (let i = 0; i < row.length; i++) {
      if (row[i].match(IS_DIGIT)) {
        digits += row[i];
        positions.push(i);
      } else {
        addNumber(digits, index, positions);
        digits = "";
        positions = [];
      }
    }
    addNumber(digits, index, positions);
  });

  function addNumber(digits, index, positions) {
    return numbers.push({
      number: digits,
      row: index,
      positions: positions,
      valid: false,
    });
  }

  numbers = numbers.filter((obj) => obj.number !== "");

  numbers.forEach((number) => {
    if (
      leftDigitValidate(number) ||
      rightDigitValidate(number) ||
      leftTopDigitValidate(number) ||
      topDigitValidate(number) ||
      rightTopDigitValidate(number) ||
      leftBottomDigitValidate(number) ||
      bottomDigitValidate(number) ||
      rightBottomDigitValidate(number)
    ) {
      number.valid = true;
    }
  });

  function leftDigitValidate(number) {
    return data[number.row]
      .charAt(number.positions[0] - 1)
      .match(NOT_DIGIT_OR_DOT);
  }

  function rightDigitValidate(number) {
    return data[number.row]
      .charAt(number.positions[number.number.length - 1] + 1)
      .match(NOT_DIGIT_OR_DOT);
  }

  function leftTopDigitValidate(number) {
    if (number.row === 0) return;
    return data[number.row - 1]
      .charAt(number.positions[0] - 1)
      .match(NOT_DIGIT_OR_DOT);
  }

  function topDigitValidate(number) {
    if (number.row === 0) return;
    return (
      data[number.row - 1]
        .charAt(number.positions[0])
        .match(NOT_DIGIT_OR_DOT) ||
      data[number.row - 1]
        .charAt(number.positions[number.number.length - 1])
        .match(NOT_DIGIT_OR_DOT)
    );
  }

  function rightTopDigitValidate(number) {
    if (number.row === 0) return;
    return (
      data[number.row - 1]
        .charAt(number.positions[0] + 1)
        .match(NOT_DIGIT_OR_DOT) ||
      data[number.row - 1]
        .charAt(number.positions[number.number.length - 1] + 1)
        .match(NOT_DIGIT_OR_DOT)
    );
  }

  function leftBottomDigitValidate(number) {
    if (number.row === data.length - 1) return;
    return data[number.row + 1]
      .charAt(number.positions[0] - 1)
      .match(NOT_DIGIT_OR_DOT);
  }

  function bottomDigitValidate(number) {
    if (number.row === data.length - 1) return;
    return (
      data[number.row + 1]
        .charAt(number.positions[0])
        .match(NOT_DIGIT_OR_DOT) ||
      data[number.row + 1]
        .charAt(number.positions[number.number.length - 1])
        .match(NOT_DIGIT_OR_DOT)
    );
  }
  function rightBottomDigitValidate(number) {
    if (number.row === data.length - 1) return;
    return (
      data[number.row + 1]
        .charAt(number.positions[0] + 1)
        .match(NOT_DIGIT_OR_DOT) ||
      data[number.row + 1]
        .charAt(number.positions[number.number.length - 1] + 1)
        .match(NOT_DIGIT_OR_DOT)
    );
  }

  let sum = 0;
  numbers.forEach((number) => {
    if (number.valid) {
      sum += Number(number.number);
    }
  });

  console.log(sum);
});
