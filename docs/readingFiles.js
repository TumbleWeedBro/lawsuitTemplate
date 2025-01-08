export async function readData(fileName) {
  try {
    const response = await fetch(fileName);
    if(!response.ok){
      throw new Error(`Failed to fetch file: ${fileName}`);
    }
    const data = await response.json();
    console.log('File content', data);
    return data;
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error; 
  }
}

// export async function readData(fileName) {
//   try {
//     // Retrieve data from localStorage
//     const data = localStorage.getItem(fileName);
//     if (!data) {
//       throw new Error(`No data found for key: ${fileName}`);
//     }

//     // Parse the JSON data
//     const parsedData = JSON.parse(data);
//     console.log('File content:', parsedData);
//     return parsedData;
//   } catch (error) {
//     console.error('Error reading data from localStorage:', error);
//     throw error;
//   }
// }


