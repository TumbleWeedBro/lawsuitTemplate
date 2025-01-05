console.log("Check the logs");

async function runQuery() {
  const requestOptions = {
    method: 'GET',
  };

  const params = {
    api_token: 'WkEnyyEtoCVjmYdew5s1BjSmCHL8YX4vHO7NZHXV', // Populate with valid API token
    categories: 'business',
    search: 'Elon Musk lawsuit',
    limit: '10',
  };

  const esc = encodeURIComponent;
  const query = Object.keys(params)
    .map((k) => esc(k) + '=' + esc(params[k]))
    .join('&');

  const QUERYBUILDER = "https://api.thenewsapi.com/v1/news/all?";
  
  try {
    const response = await fetch(QUERYBUILDER + query, requestOptions);
    const data = await response.json();
    console.log(data);
    return data; // Return the fetched data
  } catch (error) {
    console.error('Fetch error:', error);
    return null; // Handle fetch error
  }
}

function generateCards(data) {

  const template = document.getElementById("cardTemplate");
  const container = document.getElementById("cardsContainer");

  data.forEach((article) => {
    // Clone the template
    const card = template.cloneNode(true);
    card.id = ""; // Remove the ID to avoid duplicates
    card.classList.remove("hidden"); // Make the card visible

    // Update the content
    card.querySelector("img").src = article.image_url;
    card.querySelector("h5").innerText = article.title;
    card.querySelector("p").innerText = article.description;

    // Append to the container
    container.appendChild(card);
  });
}




async function runQueryAndUpdateDOM() {
  const data = await runQuery(); // Wait for the query to finish
  
  if (!data || !data.data) {
    console.error('No articles found');
    return;
  }
  generateCards(data);
}

runQueryAndUpdateDOM();
  