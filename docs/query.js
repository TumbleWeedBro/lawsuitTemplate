
import { readData } from '../docs/readingresponse.js';

function generateCards(data) {
  console.log(data[0])
  const template = document.getElementById("cardTemplate");
  const container = document.getElementById("cardsContainer");

  if (!template || !container) {
    console.error('Template or container element not found');
    return;
  }

  // Assuming the articles are in the 'data' property from the API response
  data.forEach((article) => {
    // Clone the template
    const card = template.cloneNode(true);
    card.id = ""; // Remove the ID to avoid duplicates
    card.classList.remove("hidden"); // Make the card visible

    // Check if article has expected properties to avoid errors
    card.href = article.url || '#';
    if (article.imageUrl) {  // Use the correct property (camelCase)
      card.querySelector("img").src = article.imageUrl;
    }
    card.querySelector("h5").innerText = article.title || 'No Title';
    card.querySelector("p").innerText = article.description || 'No Description';

    // Append to the container
    container.appendChild(card);
  });
}

async function runQueryAndUpdateDOM() {
  try {
    const data = await readData();  // Await the result from readData()

    if (!data || !data.articles) {  // Assuming 'articles' is the array in the response
      console.error('No articles found');
      return;
    }

    // Generate cards using the articles
    generateCards(data.articles);  // Pass only the articles to generate cards
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

runQueryAndUpdateDOM();
