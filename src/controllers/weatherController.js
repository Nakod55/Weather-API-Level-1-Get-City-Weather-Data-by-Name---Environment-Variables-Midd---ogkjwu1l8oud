const fs = require('fs');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Level 1: Get City Weather Data by Name
async function getWeatherDataByName(cityName) {
    const  weatherData = await getDataFromDatabase();
    let product= weatherData.find(product=> product.city == cityName);
    return new Promise((resolve,reject)=>{    
        if(product)
        {        
          resolve({city:cityName, ...product.weather })
        }
        else{
           reject(new Error(cityName + " not found"))
        }
      })
}


module.exports = {
  getWeatherDataByName
};