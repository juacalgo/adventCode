const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  data = data.toString().split("\n");

  let cards = [];
  // let card = {
  //   id,
  //   winningNumbers,
  //   playingNumbers,
  //   matchNumbers,
  //   points,
  // }

  initialInfo(data)

  /**
   * 
   * @param { [String] } data 
   */
  function initialInfo(data) {
    data.forEach( game => {
      let preTwoPoint = game.split(':')[0].split(' ');
      let id = preTwoPoint[preTwoPoint.length - 1];
      let card = {
        id,
        // winningNumbers,
      }
      cards.push(card)
      console.log(card);
    })

  }


  // console.log(data);
});
