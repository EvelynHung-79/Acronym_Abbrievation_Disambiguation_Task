
document.getElementById('predictButton').addEventListener('click', () => {
    // Define the API endpoint
    const apiUrl = 'http://127.0.0.1:5000/predict';

    // Example input data
    const inputData = { input: 'your_data' };

    // Make a POST request to the API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
    })
    .then(response => response.json())
    .then(data => {
        // Display the result
        document.getElementById('result').innerHTML = `Prediction: ${data.result}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = 'Error occurred. Check the console for details.';
    });
});