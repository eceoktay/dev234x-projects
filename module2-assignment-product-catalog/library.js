(function (window) {

    function myLibrary() {

        //execute code here
        var catalog = createRandomCatalog(100);

        return {
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        }

        //function definitions go here
        function createRandomProduct() {
            var typeArray = ['Electronics', 'Book', 'Clothing', 'Food'];
            var price = (Math.random() * 500).toFixed(2)
            var type = typeArray[Math.floor(Math.random() * 4)];

            return { price: price, type: type };
        }

        function createRandomCatalog(num) {
            var catalog = [];
            for (var i = 0; i < num; i++) {
                var obj = createRandomProduct();
                catalog.push({id: i, price: obj.price, type: obj.type});
            }
            return catalog;
        }

        // returns a Promise containing an array of all the products in the catalog
        // The searchAllProducts() function will return a Promise containing an array that has all of the products in the catalog. 
        // The Promise will resolve in 1000ms after the function has executed.
        function searchAllProducts() {
            var promise = new Promise(function (resolve, reject) {
                setTimeout(function() {
                    resolve(catalog);
                }, 1000);
            });
            return promise;
        }

        // returns a Promise containing the product with the specified ID
        // The searchProductById(id) function will search through the catalog array and return a Promise containing the product that matches the id argument. 
        // The Promise will resolve in 1000 millisecond after the function has executed. 
        // The Promise will reject if an invalid id is searched.
        function searchProductById(id) {
            var promise = new Promise(function(resolve, reject) {
                var i = 0;
                setTimeout(function() {
                    while (i < catalog.length) {
                        if (catalog[i].id == id) {                        
                            resolve({id:id, price:catalog[i].price, type:catalog[i].type});
                        }
                        i++;
                    }
                    reject("Invalid ID: " + id);
                }, 1000);
            });
            return promise;
        }

        // returns a Promise containing an array of products with the specified type
        // The searchProductByType(type) function will return a Promise containing an array of all of the products that matched the specified type. 
        // The Promise will resolve in 1000 millisecond after the function is executed. 
        // The Promise will reject if an invalid type is searched.
        function searchProductsByType(type) {
            var promise = new Promise(function(resolve, reject) {
                var i = 0;
                var typeArray = [];
                var possibleTypes = ['Electronics', 'Book', 'Clothing', 'Food'];
                if(!possibleTypes.includes(type)) {
                    reject("Invalid Type: " + type)
                }
                else {
                    setTimeout(function() {
                        while (i < catalog.length) {
                            if (catalog[i].type == type) {
                                typeArray.push({id:catalog[i].id, price:catalog[i].price, type:catalog[i].type});
                            }
                            i++;
                        }
                        resolve(typeArray);
                    }, 1000);
                }
            });
            return promise;
        }

        // returns a Promise containing an array of products that are within a certain amount of the specified price
        // The searchProductByPrice(price,difference) function will return a Promise containing an array of all of the products that were within the specified difference of the specified price. 
        // The Promise will resolve in 1000 milliseconds after the function is executed. 
        // The Promise will reject if an invalid price is searched.
        function searchProductsByPrice(price, difference) {
            var promise = new Promise(function(resolve, reject) {
                var i = 0;
                var priceArray = [];
                if(!isFinite(price)) {
                    reject("Invalid Price: " + price)
                }
                else{
                    setTimeout(function() {
                        while (i < catalog.length) {
                            if (Math.abs(catalog[i].price - price) < difference) {
                                priceArray.push({id:catalog[i].id, price:catalog[i].price, type:catalog[i].type});
                            }
                            i++;
                        }
                        resolve(priceArray);
                    }, 1000);
                }
            });
            return promise;
        }
    }

    if (typeof (window.api) === 'undefined') {
        window.api = myLibrary();
    }

})(window);