export async function readData(fileName) {
  try {
    const response = await fetch(fileName);
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('File content', data);
    return data;
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error; 
  }
}


