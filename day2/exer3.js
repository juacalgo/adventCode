const fs = require("fs");

const RED = "red";
const GREEN = "green";
const BLUE = "blue";
const MAX_RED_BALLS = 12;
const MAX_GREEN_BALLS = 13;
const MAX_BLUE_BALLS = 14;

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
      valid: true,
    };

    game.sets.forEach((set) => {
      set = set.split(",");
      set.forEach((balls) => {
        balls = balls.split(/\s/g);

        let ballSet = {
          numberOfBalls: balls[1],
          color: balls[2],
        };

        if (ballSet.color === RED && ballSet.numberOfBalls > MAX_RED_BALLS) {
          game.valid = false;
        }

        if (
          ballSet.color === GREEN &&
          ballSet.numberOfBalls > MAX_GREEN_BALLS
        ) {
          game.valid = false;
        }

        if (ballSet.color === BLUE && ballSet.numberOfBalls > MAX_BLUE_BALLS) {
          game.valid = false;
        }
      });
    });

    if (game.valid) {
      result += Number(game.id);
    }
  });
  console.log(result);
});
