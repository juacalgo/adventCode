const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  data = data.toString().split("\n");
  // only for windows exec
  // ---------------------------------->
  data = data.map((row, index) => {
    if (index !== data.length - 1) {
      return row.substring(0, row.length - 1);
    }
    return row;
  });

  hands = [];
  data.forEach(element => {
    let splitLine = element.split(" ");
    let hand = {
      cards: splitLine[0],
      bid: splitLine[1],
    }
    hands.push(hand);
  })

  for (let i = 0; i < hands.length; i++) {
    hands.forEach((element, index) => {
      if (i !== index && hands[index + 1] !== undefined && isStrongerThanNext(index)) {
        let keepElement = element;
        hands[index] = hands[index + 1];
        hands[index + 1] = keepElement;
      }
    })
  }

  let points = 0;
  hands.forEach((hand, index) => {
    points += (index + 1) * hand.bid;
  })
  console.log(points);

  /**
   * 
   * @param {Number} index 
   */
  function isStrongerThanNext(index) {
    let firstHand = hands[index];
    let secondHand = hands[index + 1];

    let firstHandType = typeOfHand(firstHand);
    let secondHandType = typeOfHand(secondHand);

    if (firstHandType > secondHandType) {
      return true;
    }

    if (firstHandType === secondHandType) {
      return hightestCard(firstHand, secondHand);
    }

    return false;
  }

  /**
   * 
   * @param {Object} hand 
   */
  function typeOfHand(hand) {
    let cards = hand.cards;
    let count = 0;
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards.length; j++) {
        if (i !== j && cards[i] === cards[j]) {
          count++;
        }
      }
    }
    return count;
  }

  /**
   * 
   * @param {Object} firstHand 
   * @param {Object} secondHand 
   */
  function hightestCard(firstHand, secondHand) {
    let firstHandCards = transformHand(firstHand.cards);
    let secondHandCards = transformHand(secondHand.cards);

    for (let i = 0; i < firstHandCards.length; i++) {
      if (Number(firstHandCards[i]) > Number(secondHandCards[i])) {
        return true;
      }

      if (Number(firstHandCards[i]) === Number(secondHandCards[i])) {
        continue;
      }
      return false;
    }
  }

  /**
   * 
   * @param {String} cards 
   */
  function transformHand(cards) {
    transformedCards = [];
    const cardChanger = {
      T: 10,
      J: 11,
      Q: 12,
      K: 13,
      A: 14,
    }
    for (let i = 0; i < cards.length; i++) {
      transformedCards.push(cardChanger[cards[i]] || cards[i]);
    }
    return transformedCards;
  }
});
