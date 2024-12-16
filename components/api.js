async function fetchData() {
    try {
        const response = await fetch('https://prices.azure.com/api/retail/prices?api-version=2023-01-01-preview'); // Replace with your API endpoint
        const data = await response.json();
        console.log(data); // Log the data to the console
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the fetchData function to execute it
export default fetchData();
