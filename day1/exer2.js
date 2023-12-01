const fs = require('fs');

const checks = [
  {look: 1, number: 1},
  {look: 2, number: 2},
  {look: 3, number: 3},
  {look: 4, number: 4},
  {look: 5, number: 5},
  {look: 6, number: 6},
  {look: 7, number: 7},
  {look: 8, number: 8},
  {look: 9, number: 9},
  {look: 'one', number: 1},
  {look: 'two', number: 2},
  {look: 'three', number: 3},
  {look: 'four', number: 4},
  {look: 'five', number: 5},
  {look: 'six', number: 6},
  {look: 'seven', number: 7},
  {look: 'eight', number: 8},
  {look: 'nine', number: 9}
];

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  let dirtyCoordinates = data.toString().split("\n");

  coordinates = dirtyCoordinates.map(dirtyCoordinate => {
    let array = [];
    
    checks.forEach(check => {
      if (dirtyCoordinate.indexOf(check.look) !== -1) {
        array.push({number: check.number, position: dirtyCoordinate.indexOf(check.look)});
      
        if (dirtyCoordinate.indexOf(check.look) !== dirtyCoordinate.lastIndexOf(check.look)) {
          array.push({number: check.number, position: dirtyCoordinate.lastIndexOf(check.look)});
        }
      }
    })
  
    for (let i = 0; i < array.length; i++) {
      array.forEach((element, index) => {
        if (array[index + 1] !== undefined && element.position > array[index + 1].position) {
          let keepElement = element;
          array[index] = array[index + 1];
          array[index + 1] = keepElement;
        }
      })
    }

    return String(array[0].number) + String(array[array.length - 1].number);
  })

  let sum = 0;
  coordinates.forEach(coordinate => {
    sum += Number(coordinate);
  })

  console.log(coordinates);
  console.log(sum);
})
