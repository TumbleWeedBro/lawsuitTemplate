import {runQueryAndUpdateDOM} from './updateDom.js';

const apiKey = "18fadae1-3d0d--b463-46b75325369f";

const latestUpdatesUrl = `api.goperigon.com/v1/all?apiKey=[KEY]&from=2025-01-06&sourceGroup=top100&showNumResults=true&showReprints=false&paywall=false&excludeLabel=Non-news&excludeLabel=Opinion&excludeLabel=Paid News&excludeLabel=Roundup&excludeLabel=Press Release&sortBy=date&category=Business&q=lawsuit`;

const relevantResultsUrl = `api.goperigon.com/v1/all?apiKey=[KEY]&from=2025-01-06&sourceGroup=top100&showNumResults=true&showReprints=false&paywall=false&excludeLabel=Non-news&excludeLabel=Opinion&excludeLabel=Paid News&excludeLabel=Roundup&excludeLabel=Press Release&sortBy=relevance&category=Business&q=lawsuit`; 

const businessUpdatesUrl= `https://api.goperigon.com/v1/all?apiKey=${apiKey}&showReprints=false&paywall=false&sortBy=date&category=${category}&topic=${topic}&topic=Business Leaders&q=${query}`;

let searchQueryParam = "";
const searchQueryUrl = `api.goperigon.com/v1/all?apiKey=[KEY]&from=2025-01-06&sourceGroup=top100&showNumResults=true&showReprints=false&paywall=false&excludeLabel=Non-news&excludeLabel=Opinion&excludeLabel=Paid News&excludeLabel=Roundup&excludeLabel=Press Release&sortBy=relevance&q=${searchQueryParam}`;


// Fetch articles in order
async function fetchArticlesInOrder() {
  await getArticles(latestUpdatesUrl, "latestUpdates.json");
  await getArticles(relevantResultsUrl, "relevantResults.json");
  await getArticles(businessUpdatesUrl, "businessUpdates.json");
}

async function getArticles(url, fileName) {
  await axios.get(url)
    .then((response) => {
      const data = response.data;
      storeArticles(fileName, data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function storeArticles(keyName, data) {
  try {
    localStorage.setItem(keyName, JSON.stringify(data));
    console.log(`Data saved to localStorage under the key "${keyName}".`);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

fetchArticlesInOrder();
runQueryAndUpdateDOM();