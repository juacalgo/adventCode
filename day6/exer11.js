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

  data = cleanInputData(data)

  let races = prepareObject(data);
  let holdTimeButton = calculateholdedTime(races);
  let totalChancesOfWinning = calcTotalChancesOfWinning(holdTimeButton);

  console.log(totalChancesOfWinning);

 
  /**
   * 
   * @param {[String]} data 
   * @returns {Object}
   */
  function cleanInputData(data) {
    let timeLine = data[0].split(' ');
    timeLine.shift();
    let times = timeLine.filter(element => element !== (''));
    
    let distanceLine = data[1].split(' ');
    distanceLine.shift();
    let distances = distanceLine.filter(element => element !== (''));

    return {times, distances};
  }

  /**
   * 
   * @param {[Number]} data 
   * @returns {[Object]}
   */
  function prepareObject(data) {
    let races = [];
    for (let i = 0; i < data.times.length; i++) {
      races[i] = {
        id: i,
        time: data.times[i],
        distance: data.distances[i],
      }
    }
    return races;
  }

  /**
   * 
   * @param {[Object]} races 
   */
  function calculateholdedTime(races) {
    let holdedTimes = [];
    races.forEach(race => {
      let intersectTimes = secondGradeEquation(race);
      holdedTimes.push(intersectTimes)
    })
    return holdedTimes;
  }

  /**
   * 
   * @param {Number} race.time 
   * @param {Number} race.distance 
   * @return {Object}
   */
  function secondGradeEquation({time, distance}) {
    let firstIntersection = Math.ceil((Number(time) + Math.sqrt(Math.pow(Number(time), 2) - 4 * Number(distance))) / 2);
    let secondtIntersection = Math.ceil((Number(time) - Math.sqrt(Math.pow(Number(time), 2) - 4 * Number(distance))) / 2);
    return {maxLimit: firstIntersection, minLimit: secondtIntersection};
  }

  /**
   * 
   * @param {Array} holdTimeButton
   * @return {Number}
   */
  function calcTotalChancesOfWinning(holdTimeButton) {
    let totalChancesByRace = [];
    let power = 1;
    holdTimeButton.forEach(race => {
      totalChancesByRace.push(race.maxLimit - race.minLimit);
    })
    totalChancesByRace.forEach(chances => {
      power *= chances;
    })
    return power;
  }
});