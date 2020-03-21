/*
Face API Keys: 
023f1661f6244d3e9f81501646ef9a0f
17a26f2fbc9240aebfb272df98928812

Text Analytics API Keys: 
8e9100485bab4a7a8b3b261626e7e3c6
7e3029df2246402ebd81c3b480eb813b
*/

document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze() {
    var reqBody = {
        "documents": [
            {
                "language": "en",
                "id": 1,
                "text": document.getElementById("input").value
            }
        ]
    };

    var myHeader = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '8e9100485bab4a7a8b3b261626e7e3c6'
    });

    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

    var request = new Request('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', initObject);

    fetch(request).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function (response) {
        document.getElementById("output").innerHTML = "Total Key Phrases: " + response.documents[0].keyPhrases.length + "<br>" + response.documents[0].keyPhrases;
    }).catch(function (err) {
        alert(err);
        document.getElementById("output").innerHTML = "";
    });
}