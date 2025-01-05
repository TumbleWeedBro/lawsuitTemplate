
// import { LocalStorage } from 'node-localstorage'; // Correct path
// export const localStorage = new LocalStorage('./scratch');

console.log("Check the logs");
let articles; 

function runQuery() {
  const requestOptions = {
    method: 'GET'
  };

  const params = {
    api_token: 'WkEnyyEtoCVjmYdew5s1BjSmCHL8YX4vHO7NZHXV', // Populate with valid API token
    categories: 'business', 
    search: 'Elon Musk lawsuit', 
    limit: '10'
  }; 

  const esc = encodeURIComponent;
  var query = Object.keys(params)
    .map((k) => esc(k) + '=' + esc(params[k]))
    .join('&');

  const QUERYBUILDER = "https://api.thenewsapi.com/v1/news/all?"; // Corrected URL
  return fetch(QUERYBUILDER + query, requestOptions) // Return the fetch promise
    .then(response => response.json())
    .then(data => {
      articles = JSON.stringify(data);
      console.log(data);
    })
    .catch(error => console.log('error', error));
}

async function runQueryAndReadJson() {
  await runQuery();   // Wait for runQuery to finish
  readJsonResponse(); // Then run readJsonResponse
}

runQueryAndReadJson();

// let variableStorage = localStorage.getItem('response.txt');
// console.log(variableStorage);

// for (let i = 0; i < articles.length; i++) {
//   const article = articles[i];
//   console.log(`Title: ${article.title}`);
//   console.log(`Description: ${article.description}`);
//   console.log(`Image URL: ${article.image_url}`);
//   console.log('----------------------');

document.querySelector("#UpdateCard img").src = articles[1].image_url;
// Update the title
document.querySelector("#UpdateCard h5").innerText = articles[1].title;
// Update the paragraph
document.querySelector("#UpdateCard p").innerText = articles[1].description; 
