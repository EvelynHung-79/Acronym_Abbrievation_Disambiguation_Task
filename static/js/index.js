document.getElementById('inputbox').addEventListener('keyup', function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        requestPrediction();
    }
});
document.getElementById('predictButton').addEventListener('click', async () => {
    requestPrediction();
});

async function requestPrediction() {
    const inputData = document.getElementById('inputbox').value;
    try {
        let response = await callAPI(inputData);
        if (response.results) {
            let results = response.results;

            var wordsToHighlight = results.acronyms.map(acronymObj => acronymObj.acronym);
            var expansions = results.acronyms.map(acronymObj => acronymObj.expansion);
            let sentence = results.sentence;
            wordsToHighlight.forEach((word, index) => {
                const regex = new RegExp('\\b' + word + '\\b', 'gi'); // Match whole word only
                const replacement = `<span class="highlight">${word}</span> (${expansions[index]})`;
                sentence = sentence.replace(regex, replacement);
              });
            document.getElementById('sentence').innerHTML = sentence;

            generateContainersForAcronym(results);
            document.getElementById('resultContainer').style.display = 'flex';
        } else {
            window.alert('No result returned');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function callAPI(reqbody) {
    try {
        const response = await fetch('/predict', {
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
        throw error;
    }
}

function generateContainersForAcronym(results) {
    document.getElementById('answers').innerHTML = "";
    results.acronyms.forEach(acronymObj => {
        document.getElementById('answers').innerHTML += `<div class="category-box">
            <div class="tabs d-flex justify-content-between align-items-center" id="${acronymObj.acronym + "_tab"}">
                <h4>${acronymObj.acronym}</h4>
                <span class="accordion-toggle" data-bs-toggle="collapse" href=""><i
                        class="fas fa-chevron-down"></i></span>
            </div>
            <div class="items collapse show" id="${acronymObj.acronym + "_probs"}" style="display: none; justify-content: center;">
            </div>
        </div>`;

        let table = document.createElement('table');
        table.classList = 'tables';
        table.innerHTML = `<tr>
                    <th>Acronym</th>
                    <th>Long Term</th>
                    <th>Percentage</th>
                </tr>`;

        let new_prob_list = acronymObj.probs.sort(function (a, b) {
            return b.prob - a.prob;
        });
        new_prob_list.forEach(choice => {
            let row = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            td1.textContent = acronymObj.acronym;
            td2.textContent = choice.expansion;
            td3.textContent = (choice.prob * 100).toFixed(3) + '%';
            row.append(td1, td2, td3);
            table.append(row);
        })
        document.getElementById(`${acronymObj.acronym + "_probs"}`).append(table);
    })

    addEventListenerForTabs();
}

function addEventListenerForTabs() {
    let tabs = document.getElementsByClassName("tabs");
    Array.from(tabs).forEach(tab => {
        tab.addEventListener('click', () => {
            let tab_content_name = tab.id.split('_')[0] + '_probs';
            let tab_content = document.getElementById(`${tab_content_name}`);
            tab_content.style.display = (tab_content.style.display == "none") ? "flex" : "none";
            tab.querySelector("span i").classList = (tab_content.style.display === "none") ? "fas fa-chevron-down" : "fas fa-chevron-up";
        })
    })
}