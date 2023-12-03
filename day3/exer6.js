const fs = require("fs");

const IS_DIGIT = /\d/g;
const IS_STAR = /\*/g;

fs.readFile("inputSh.txt", "utf8", (err, data) => {
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

  let stars = [];

  data.forEach((row, index) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i].match(IS_STAR)) {
        addStar(index, i);
      }
    }
  });

  function addStar(index, position) {
    return stars.push({
      row: index,
      position: position,
      valid: false,
    });
  }

  //   numbers = numbers.filter((obj) => obj.number !== "");

  console.log(stars);

  stars.forEach((star) => {
    leftDigit(star);
    rightDigit(star);
    leftTopDigit(star);
    topDigit(star);
    rightTopDigit(star);
    leftBottomDigit(star);
    bottomDigit(star);
    rightBottomDigit(star);
  });

  function buildNumber({ row }, { digit, position }) {
    let leftSide = data[row].charAt(position - 1);
    let rightSide = data[row].charAt(position + 1);
    for (let pos = position; !data[row].charAt(pos).match(IS_DIGIT); pos--) {
      digit = leftSide + digit;
    }
    for (let pos = position; !data[row].charAt(pos).match(IS_DIGIT); pos++) {
      digit = digit + rightSide;
    }
    console.log(digit);
    // if (leftSide.match(IS_DIGIT)) {
    //   digit = leftSide + digit;
    // }
    // if (rightSide.match(IS_DIGIT)) {
    //   digit = digit + rightSide;
    // }
  }

  function leftDigit(star) {
    let positionToSearch = star.position - 1;
    let digit = data[star.row].charAt(star.position - 1);
    if (digit.match(IS_DIGIT)) {
      let number = {
        digit: digit,
        position: positionToSearch,
      };
      buildNumber(star, number);
    }
  }

  function rightDigit(star) {
    return data[star.row].charAt(star.position + 1).match(IS_DIGIT);
  }

  function leftTopDigit(star) {
    if (star.row === 0) return;
    return data[star.row - 1].charAt(star.position - 1).match(IS_DIGIT);
  }

  function topDigit(star) {
    if (star.row === 0) return;
    return data[star.row - 1].charAt(star.position).match(IS_DIGIT);
  }

  function rightTopDigit(star) {
    if (star.row === 0) return;
    return data[star.row - 1].charAt(star.position + 1).match(IS_DIGIT);
  }

  function leftBottomDigit(star) {
    if (star.row === data.length - 1) return;
    return data[star.row + 1].charAt(star.position - 1).match(IS_DIGIT);
  }

  function bottomDigit(star) {
    if (star.row === data.length - 1) return;
    return data[star.row + 1].charAt(star.position).match(IS_DIGIT);
  }
  function rightBottomDigit(star) {
    if (star.row === data.length - 1) return;
    return data[star.row + 1].charAt(star.position + 1).match(IS_DIGIT);
  }

  //   let sum = 0;
  //   numbers.forEach((number) => {
  //     if (number.valid) {
  //       sum += Number(number.number);
  //     }
  //   });

  //   console.log(sum);
});
