const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  // for windows exec
  // ---------------------------------->
  data = data.toString().split("\r\n\r\n");
  
  // for MacOs exec
  // ---------------------------------->
  // data = data.toString().split("\r\n\r\n");

  data = cleanData(data);
  data = tansformMaps(data);
  seedsLocation = calculateLocationSeeds(data);

  minLocation = Math.min(...seedsLocation);
  console.log(minLocation);

  /**
   * 
   * @param {[String]} data 
   * @return {Object}
   */
  function cleanData(data) {
    let preSeeds = data[0].split(':')[1].trim().split(' ');
    let seeds = calculateWhichSeedsHave(preSeeds);

    let cleanInfo = {
      seeds,
      seed_to_soil: data[1].split(':')[1].trim().split('\r\n'),
      soil_to_ferti: data[2].split(':')[1].trim().split('\r\n'),
      ferti_to_water: data[3].split(':')[1].trim().split('\r\n'),
      water_to_light: data[4].split(':')[1].trim().split('\r\n'),
      light_to_temp: data[5].split(':')[1].trim().split('\r\n'),
      temp_to_humidity: data[6].split(':')[1].trim().split('\r\n'),
      humidity_to_location: data[7].split(':')[1].trim().split('\r\n'),
    }
    return cleanInfo;
  }

  /**
   * 
   * @param {Object} data 
   */
  function tansformMaps(data) {
    seed_to_soil = transformToMap(data.seed_to_soil);
    soil_to_ferti = transformToMap(data.soil_to_ferti);
    ferti_to_water = transformToMap(data.ferti_to_water);
    water_to_light = transformToMap(data.water_to_light);
    light_to_temp = transformToMap(data.light_to_temp);
    temp_to_humidity = transformToMap(data.temp_to_humidity);
    humidity_to_location = transformToMap(data.humidity_to_location);
    
    return {
      seeds: data.seeds,
      toSoilMapper: seed_to_soil,
      toFertiMapper: soil_to_ferti,
      toWaterMapper: ferti_to_water,
      toLightMapper: water_to_light,
      toTempMapper: light_to_temp,
      toHumidityMapper: temp_to_humidity,
      toLocationMapper: humidity_to_location,
    }
  }

  /**
   * 
   * @param {[String]} transformerData 
   */
  function transformToMap(transformerData) {
    let mapperArray = [];
    let count = 0;
    transformerData.forEach(pattern => {
      let mapper = [];
      let transformerDataSplit = pattern.split(' ');
      let destinationStart = Number(transformerDataSplit[0]);
      let sourceStart = Number(transformerDataSplit[1]);
      let range = Number(transformerDataSplit[2]);
      
      mapper = {
        minSource: sourceStart,
        maxSource: sourceStart + range,
        minDestination: destinationStart,
        maxDestination: destinationStart + range,
        id: count++,
      }

      mapperArray.push(mapper);
    })
    return mapperArray;
  }

  /**
   * 
   * @param {[String]} data.seeds
   * @param {[Object]} data.toSoilMapper
   * @param {[Object]} data.toWaterMapper
   * @param {[Object]} data.toLightMapper
   * @param {[Object]} data.toTempMapper
   * @param {[Object]} data.toHumidityMapper
   * @param {[Object]} data.toLocationMapper
   * @param {[Object]} data.toFertiMapper
   * @return {[Number]}
   */
  function calculateLocationSeeds({seeds, toSoilMapper, toFertiMapper, toWaterMapper, toLightMapper, toTempMapper, toHumidityMapper, toLocationMapper}) {
    let seedsInfo = [];
    seeds.forEach(seed => {
      let seedToSoil = calculateSeed(seed, toSoilMapper);
      let soilToFerti = calculateSeed(seedToSoil, toFertiMapper);
      let fertiToWater = calculateSeed(soilToFerti, toWaterMapper);
      let waterToLight = calculateSeed(fertiToWater, toLightMapper);
      let lightToTemp = calculateSeed(waterToLight, toTempMapper);
      let tempToHumidity = calculateSeed(lightToTemp, toHumidityMapper);
      let humToLocation = calculateSeed(tempToHumidity, toLocationMapper);
      seedsInfo.push(Number(humToLocation));
    })
    return seedsInfo;
  }

  /**
   * 
   * @param {String} seed 
   * @param {[Object]} mappers
   */
  function calculateSeed(seed, mappers) {
    let result;
    for (let i = 0; i < mappers.length; i++) {
      if (seed >= mappers[i].minSource && seed < mappers[i].maxSource) {
        result = mappers[i].id;
        break;
      }
      result = -1;
    }

    if (result != -1) {
      let mapper = mappers.filter(mapper => mapper.id == result);
      let transformedSeed = Number(seed) - Number(mapper[0].minSource) + Number(mapper[0].minDestination);
      return transformedSeed;
    }

    return seed;
  }

  /**
   * 
   * @param {[String]} preSeeds 
   */
  function calculateWhichSeedsHave(preSeeds) {
    let seeds = [];
    for (let i = 0; i < (preSeeds.length / 2); i++) {
      for (let j = preSeeds[i * 2]; j < Number(preSeeds[i * 2]) + Number(preSeeds[i * 2 + 1]); j++) {
        seeds.push(j);
      }
    }
    return seeds;
  }
});
