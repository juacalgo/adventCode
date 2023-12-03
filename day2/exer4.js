const fs = require("fs");

const RED = "red";
const GREEN = "green";
const BLUE = "blue";

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  let games = data.toString().split("\n");
  let result = 0;

  games.forEach((game) => {
    let cleanGame = game.split(":");

    game = {
      id: cleanGame[0].split(" ")[1],
      sets: cleanGame[1].split(";"),
      power: 0,
    };

    let maxRedBalls = 0;
    let maxGreenBalls = 0;
    let maxBlueBalls = 0;

    game.sets.forEach((set) => {
      set = set.split(",");
      set.forEach((balls) => {
        balls = balls.split(/\s/g);

        let ballSet = {
          numberOfBalls: balls[1],
          color: balls[2],
        };

        if (
          ballSet.color === RED &&
          Number(ballSet.numberOfBalls) > maxRedBalls
        ) {
          maxRedBalls = ballSet.numberOfBalls;
        }

        if (
          ballSet.color === GREEN &&
          Number(ballSet.numberOfBalls) > maxGreenBalls
        ) {
          maxGreenBalls = ballSet.numberOfBalls;
        }

        if (
          ballSet.color === BLUE &&
          Number(ballSet.numberOfBalls) > maxBlueBalls
        ) {
          maxBlueBalls = ballSet.numberOfBalls;
        }
      });
    });

    game.power = maxRedBalls * maxGreenBalls * maxBlueBalls;
    result += game.power;
  });
  console.log(result);
});
