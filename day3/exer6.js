const fs = require("fs");

const IS_DIGIT = /\d/g;
const IS_STAR = /\*/g;

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  data = data.toString().split("\n");

  let stars = [];
  let starID = 0;

  data.forEach((row, index) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i].match(IS_STAR)) {
        addStar(index, i);
      }
    }
  });

  function addStar(index, position) {
    stars.push({
      id: starID,
      row: index,
      position: position,
      valid: false,
      digits: [],
      power: 0,
    });
    return starID++;
  }

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

  function buildNumber({ digit, row, position }, star) {
    let leftSide = data[row].charAt(position - 1);
    let rightSide = data[row].charAt(position + 1);
    for (let pos = position; data[row].charAt(pos - 1).match(IS_DIGIT); pos--) {
      digit = leftSide + digit;
      leftSide = data[row].charAt(pos - 2);
    }
    for (let pos = position; data[row].charAt(pos + 1).match(IS_DIGIT); pos++) {
      digit = digit + rightSide;
      rightSide = data[row].charAt(pos + 2);
    }
    
    setStarDigit(digit, star);
  }

  function setStarDigit(digit, star) {
    let digitAlreadyExists = false;
    star.digits.forEach(starDigit => {
      if (digit === starDigit) {
        digitAlreadyExists = true;
      }
    })
    if (!digitAlreadyExists) {
      stars[star.id].digits.push(digit);
    }
  }

  function leftDigit(star) {
    let positionToSearch = star.position - 1;
    let digit = data[star.row].charAt(positionToSearch);
    if (digit.match(IS_DIGIT)) {
      let number = {
        digit: digit,
        row: star.row,
        position: positionToSearch,
      };
      buildNumber(number, star);
    }
  }

  function rightDigit(star) {
    let positionToSearch = star.position + 1;
    let digit = data[star.row].charAt(positionToSearch);
    if (digit.match(IS_DIGIT)) {
      let number = {
        digit: digit,
        row: star.row,
        position: positionToSearch,
      };
      buildNumber(number, star);
    }
  }

  function leftTopDigit(star) {
    if (star.row === 0) return;
    let positionToSearch = star.position - 1;
    let digit = data[star.row - 1].charAt(positionToSearch);
    if (digit.match(IS_DIGIT)) {
      let number = {
        digit: digit,
        row: star.row - 1,
        position: positionToSearch,
      };
      buildNumber(number, star);
    }
  }

  function topDigit(star) {
    if (star.row === 0) return;
    let positionToSearch = star.position;
    let digit = data[star.row - 1].charAt(positionToSearch);
    if (digit.match(IS_DIGIT)) {
      let number = {
        digit: digit,
        row: star.row - 1,
        position: positionToSearch,
      };
      buildNumber(number, star);
    }
  }

  function rightTopDigit(star) {
    if (star.row === 0) return;
    let positionToSearch = star.position + 1;
    let digit = data[star.row - 1].charAt(positionToSearch);
    if (digit.match(IS_DIGIT)) {
      let number = {
        digit: digit,
        row: star.row - 1,
        position: positionToSearch,
      };
      buildNumber(number, star);
    }
  }

  function leftBottomDigit(star) {
    if (star.row === data.length - 1) return;
    let positionToSearch = star.position - 1;
    let digit = data[star.row + 1].charAt(positionToSearch);
    if (digit.match(IS_DIGIT)) {
      let number = {
        digit: digit,
        row: star.row + 1,
        position: positionToSearch,
      };
      buildNumber(number, star);
    }
  }

  function bottomDigit(star) {
    if (star.row === data.length - 1) return;
    let positionToSearch = star.position;
    let digit = data[star.row + 1].charAt(positionToSearch);
    if (digit.match(IS_DIGIT)) {
      let number = {
        digit: digit,
        row: star.row + 1,
        position: positionToSearch,
      };
      buildNumber(number, star);
    }
  }
  function rightBottomDigit(star) {
    if (star.row === data.length - 1) return;
    let positionToSearch = star.position + 1;
    let digit = data[star.row + 1].charAt(positionToSearch);
    if (digit.match(IS_DIGIT)) {
      let number = {
        digit: digit,
        row: star.row + 1,
        position: positionToSearch,
      };
      buildNumber(number, star);
    }
  }

  stars = stars.filter(star => star.digits.length === 2);

  let sum = 0;
  stars.forEach((star) => {
    star.power = Number(star.digits[0]) * Number(star.digits[1]);
    sum += Number(star.power);
  });

  console.log(sum);
});
