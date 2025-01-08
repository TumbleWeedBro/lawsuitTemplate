
import { readData } from './readingFiles.js';

function generateSectionCards(data, templateId, containerId) {
  const template = document.getElementById(templateId);
  const container = document.getElementById(containerId);

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

export async function runQueryAndUpdateDOM() {
  try {
    const dataLatestUpdate = await readData("latestUpdates.json");  // Await the result from readData()
    const dataRelevantResults = await readData("relevantResults.json");  // Await the result from readData()
    const dataBusinessUpdates = await readData("businessUpdates.json");  // Await the result from readData()

    if (!dataLatestUpdate || !dataLatestUpdate.articles) {  // Assuming 'articles' is the array in the response
      console.error('No articles found');
      return;
    }

    console.log("generating cards")
    // Generate cards using the articles
    await generateSectionCards(dataLatestUpdate.articles, "section2Card", "section2CardContainer");  // Pass only the articles to generate cards
    await generateSectionCards(dataRelevantResults.articles, "section3Card", "section3CardContainer");  // Pass only the articles to generate cards
    await generateSectionCards(dataBusinessUpdates.articles, "section4Card", "section4CardContainer");  // Pass only the articles to generate cards

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

runQueryAndUpdateDOM();
