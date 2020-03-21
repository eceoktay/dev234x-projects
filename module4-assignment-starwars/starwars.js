document.getElementById("button").addEventListener('click', function () {
    run(gen).catch(function (err) {
        alert(err.message);
    });
});

function run(genFunc) {
    //creating a generator object
    const genObject = genFunc();

    //recursive function to iterate through promises
    function iterate(iteration) {
        if (iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
            .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
            .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
    }

    try {
        return iterate(genObject.next()); //starts the recursive loop
    } catch (ex) {
        return Promise.reject(ex); //returns a rejected promise if an exception is caught
    }
}

function* gen() {
    // Getting information of the selected starships
    var starShip1Response = yield fetch("http://swapi.co/api/starships/" + document.getElementById("select1").value);
    var starShip1 = yield starShip1Response.json();
    var starShip2Response = yield fetch("http://swapi.co/api/starships/" + document.getElementById("select2").value);
    var starShip2 = yield starShip2Response.json();

    // Filling the table with the data
    document.getElementById("data_1_name").innerHTML = starShip1.name;
    document.getElementById("data_2_name").innerHTML = starShip2.name;
    document.getElementById("data_1_cost").innerHTML = starShip1.cost_in_credits;
    document.getElementById("data_2_cost").innerHTML = starShip2.cost_in_credits;
    document.getElementById("data_1_speed").innerHTML = starShip1.max_atmosphering_speed;
    document.getElementById("data_2_speed").innerHTML = starShip2.max_atmosphering_speed;
    document.getElementById("data_1_cargosize").innerHTML = starShip1.cargo_capacity;
    document.getElementById("data_2_cargosize").innerHTML = starShip2.cargo_capacity;
    document.getElementById("data_1_passengers").innerHTML = starShip1.passengers;
    document.getElementById("data_2_passengers").innerHTML = starShip2.passengers;
    
    // Highlighting the cells
    highlightCell("data_1_cost", "data_2_cost");
    highlightCell("data_1_speed", "data_2_speed");
    highlightCell("data_1_cargosize", "data_2_cargosize");
    highlightCell("data_1_passengers", "data_2_passengers");
}

function highlightCell(element1, element2) {
    if (parseInt(document.getElementById(element1).innerHTML) > parseInt(document.getElementById(element2).innerHTML)) {
        document.getElementById(element1).bgColor = "red"
    }
    else if (parseInt(document.getElementById(element1).innerHTML) < parseInt(document.getElementById(element2).innerHTML)) {
        document.getElementById(element2).bgColor = "red"
    }
}