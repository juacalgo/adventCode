const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  let dirtyCoordinates = data.toString().split("\n");
  
  coordinates = dirtyCoordinates.map(dirtyCoordinate => {
    dirtyCoordinate = dirtyCoordinate.replace(/\D/g, '');
    return dirtyCoordinate[0] + dirtyCoordinate[dirtyCoordinate.length - 1]
  })

  let sum = 0;
  coordinates.forEach(coordinate => {
    sum += Number(coordinate);
  })

  console.log(coordinates);
  console.log(sum);
});
