const apiUrl = 'http://localhost:5000/predict';

document.getElementById('predictButton').addEventListener('click', async () => {

    // Example input data
    const inputData = document.getElementById('inputbox').value;
    try {
        let response = await callAPI(apiUrl, inputData);
        if (response.results) {
            let results = response.results;
            let word_list = results.sentence.split(' ');
            let wordToHighlight = word_list[results.position];
            document.getElementById('sentence').innerHTML = "<strong>Sentence: </strong>" + results.sentence.replace(new RegExp(wordToHighlight, 'gi'), function(match) {
                return '<span class="highlight">' + match + '</span>';
            });
            
            let table = document.getElementById('answer_table');
            table.innerHTML = `<tr>
                <th>Term</th>
                <th>Percentage</th>
            </tr>`;
            let new_answer_list = results.answer.sort(function(a, b) {
                return b.percentage - a.percentage;
            });
            new_answer_list.forEach(result => {
                let row = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                td1.textContent = result.word;
                td2.textContent = result.percentage;
                row.append(td1, td2);
                table.append(row);
            })
            document.getElementById('resultContainer').style.display = 'flex';
        } else {

        }
    } catch (error) {
        console.error('Error:', error);
    }


});

async function callAPI(apiUrl, reqbody) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqbody),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
}