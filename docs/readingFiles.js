export async function readData(fileName) {
  try {
    // Retrieve data from localStorage
    const data = localStorage.getItem(fileName);
    if (!data) {
      throw new Error(`No data found for key: ${fileName}`);
    }

    // Parse the JSON data
    const parsedData = JSON.parse(data);
    console.log('File content:', parsedData);
    return parsedData;
  } catch (error) {
    console.error('Error reading data from localStorage:', error);
    throw error;
  }
}
