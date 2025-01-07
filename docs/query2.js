const fs = require('fs');
let data;
let topic = 'Lawsuit';
let category = 'Business'
let fromDate = '2024-01-01';
let query = "lawsuit";
const axios = require('axios');
const apiKey ="18fadae1-3d0d-4524-b463-46b75325369f"
const url = `https://api.goperigon.com/v1/all?apiKey=${apiKey}&showReprints=false&paywall=false&sortBy=date&category=${category}&topic=${topic}&topic=Business Leaders&q=${query}`;


axios.get(url)
  .then((response) => {
    console.log('API Response:', response.data);  // Add this line to inspect the response
    const data = response.data;
    fs.writeFile('sponse.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error saving to file:', err);
      } else {
        console.log('Data saved to sponse.json');
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
