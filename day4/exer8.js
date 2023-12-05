const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  data = data.toString().split("\n");
  // only for windows exec
  // ---------------------------------->
  // data = data.map((row, index) => {
  //   if (index !== data.length - 1) {
  //     return row.substring(0, row.length - 1);
  //   }
  //   return row;
  // });

  let cards = [];

  initialInfo(data);
  cards = cards.map(card => {
    return {
      ...card,
      matchNumbers: checkMatch(card),
    }
  });

  cards.forEach(card => {
    calculateExtraCards(card);
  })

  let totalCards = 0;
  cards.forEach(card => totalCards += card.amount);

  console.log(totalCards);

  /**
   * 
   * @param { [String] } data 
   */
  function initialInfo(data) {
    data.forEach( game => {
      let firstSplit = game.split(':');

      let leftTwoPoints = firstSplit[0].split(' ');
      let id = leftTwoPoints[leftTwoPoints.length - 1];

      let dirtyNumbers = firstSplit[1].split('|');
      let dirtyWinningNumbers = dirtyNumbers[0].trim();
      let dirtyPlayingNumbers = dirtyNumbers[1].trim();

      let winningNumbers = dirtyWinningNumbers.split(' ').filter(number => number.length > 0);
      let playingNumbers = dirtyPlayingNumbers.split(' ').filter(number => number.length > 0);

      let card = {
        id,
        winningNumbers,
        playingNumbers,
        amount: 1,
      }
      cards.push(card)
    })
  }

  /**
   * 
   * @param {Array} cards.winningNumbers
   * @param {Array} cards.playingNumbers
   */
  function checkMatch({ winningNumbers, playingNumbers }) {
    return winningNumbers.filter( winningNumber => playingNumbers.includes(winningNumber));
  }

  /**
   * 
   * @param {Object} card 
   */
  function calculateExtraCards(card) {
    for (let i = 0; i < card.amount; i++) {
      for (let j = 0; j < card.matchNumbers.length; j++) {
        let index = Number(card.id) + j;
        amount = cards[index].amount + 1;
        cards[index] = {
          ...cards[index],
          amount,
        }
      }
    }
  }
});
