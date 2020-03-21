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
    // Populating the Image Section with the provided URL image
    var imageUrl = document.getElementById("imageUrlInput").value;
    document.getElementById("inputImage").src = imageUrl;

    var reqHeader = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '17a26f2fbc9240aebfb272df98928812'
    });

    var reqBody = {
        "url": imageUrl
    };

    var initObject = {
        method: 'POST',
        headers: reqHeader,
        body: JSON.stringify(reqBody)
    }

    var request = new Request('https://westus.api.cognitive.microsoft.com/face/v1.0/detect', initObject);

    fetch(request).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function (response) {
        if (response.length == 0) {
            document.getElementById("attributesText").innerHTML = "No Faces Detected";
        }
        else {
            document.getElementById("attributesText").innerHTML = "Age: " + response[0].faceAttributes.age + "<br>Gender: " + response[0].faceAttributes.gender;
        }
    }).catch(function (err) {
        alert(err);
        document.getElementById("attributesText").innerHTML = "";
    });
}